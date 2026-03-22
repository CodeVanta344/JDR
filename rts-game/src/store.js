import { create } from 'zustand'

// Types de formations
export const FORMATIONS = {
  LINE: 'line',      // Ligne (infanterie)
  SQUARE: 'square', // Carré (défensif)
  WEDGE: 'wedge',   // Coin (charge)
  LOOSE: 'loose'    // Dispersé (archers)
}

// Types d'unités
export const UNIT_TYPES = {
  SWORDSMAN: { name: 'Épéiste', hp: 100, damage: 15, speed: 2, range: 15, armor: 5 },
  SPEARMAN: { name: 'Lancier', hp: 80, damage: 20, speed: 1.8, range: 25, armor: 3 },
  ARCHER: { name: 'Archer', hp: 50, damage: 25, speed: 2.2, range: 150, armor: 1 },
  CAVALRY: { name: 'Cavalerie', hp: 120, damage: 30, speed: 5, range: 20, armor: 4 },
  SHIELD: { name: 'Porte-bouclier', hp: 150, damage: 8, speed: 1.5, range: 10, armor: 10 }
}

const generateRegimentId = () => `regiment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

const useGameStore = create((set, get) => ({
  // Caméra
  camera: { x: 0, y: 0, zoom: 1 },
  setCamera: (camera) => set({ camera }),
  
  // Sélection
  selectedRegiments: [],
  selectRegiment: (id, add = false) => set((state) => ({
    selectedRegiments: add 
      ? [...state.selectedRegiments, id]
      : [id]
  })),
  selectMultiple: (ids) => set({ selectedRegiments: ids }),
  clearSelection: () => set({ selectedRegiments: [] }),
  
  // Drag box
  dragBox: null,
  setDragBox: (dragBox) => set({ dragBox }),
  
  // Régiments
  regiments: [],
  
  addRegiment: (type, x, y, player = 'player', count = 40) => {
    const id = generateRegimentId()
    const stats = UNIT_TYPES[type]
    
    // Générer les soldats individuels
    const soldiers = []
    const cols = Math.ceil(Math.sqrt(count))
    const spacing = 12
    
    for (let i = 0; i < count; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      soldiers.push({
        id: `${id}_soldier_${i}`,
        x: x + (col - cols/2) * spacing,
        y: y + (row - Math.ceil(count/cols)/2) * spacing,
        targetX: null,
        targetY: null,
        hp: stats.hp,
        maxHp: stats.hp,
        state: 'idle', // idle, moving, attacking, routing
        enemy: null
      })
    }
    
    const regiment = {
      id,
      type,
      player, // 'player' ou 'enemy'
      x,
      y,
      targetX: null,
      targetY: null,
      targetEnemy: null,
      formation: FORMATIONS.LINE,
      soldiers,
      moral: 100,
      maxMoral: 100,
      ...stats,
      selected: false
    }
    
    set((state) => ({ regiments: [...state.regiments, regiment] }))
    return id
  },
  
  moveRegiment: (id, x, y, formation = null) => {
    set((state) => ({
      regiments: state.regiments.map(r => {
        if (r.id !== id) return r
        
        const newFormation = formation || r.formation
        const soldiers = [...r.soldiers]
        const count = soldiers.length
        let cols, spacing = 12
        
        // Calculer la formation
        switch(newFormation) {
          case FORMATIONS.LINE:
            cols = Math.min(count, 10)
            break
          case FORMATIONS.SQUARE:
            cols = Math.ceil(Math.sqrt(count))
            break
          case FORMATIONS.WEDGE:
            cols = Math.ceil(count / 3)
            break
          case FORMATIONS.LOOSE:
            cols = Math.ceil(count / 2)
            spacing = 20
            break
          default:
            cols = Math.min(count, 10)
        }
        
        // Mettre à jour les positions cibles des soldats
        const updatedSoldiers = soldiers.map((s, i) => {
          let col, row, offsetX, offsetY
          
          switch(newFormation) {
            case FORMATIONS.WEDGE:
              row = Math.floor(i / cols)
              col = i % cols
              // Formation en coin: large à l'arrière, pointe devant
              offsetX = (col - cols/2) * spacing * (1 + row * 0.3)
              offsetY = row * spacing
              break
            case FORMATIONS.LOOSE:
              row = Math.floor(i / cols)
              col = i % cols
              offsetX = (col - cols/2) * spacing + (Math.random() - 0.5) * 5
              offsetY = row * spacing + (Math.random() - 0.5) * 5
              break
            default:
              col = i % cols
              row = Math.floor(i / cols)
              offsetX = (col - cols/2) * spacing
              offsetY = row * spacing
          }
          
          return {
            ...s,
            targetX: x + offsetX,
            targetY: y + offsetY,
            state: 'moving'
          }
        })
        
        return {
          ...r,
          targetX: x,
          targetY: y,
          formation: newFormation,
          soldiers: updatedSoldiers
        }
      })
    }))
  },
  
  attackRegiment: (id, targetId) => {
    set((state) => ({
      regiments: state.regiments.map(r => 
        r.id === id ? { ...r, targetEnemy: targetId } : r
      )
    }))
  },
  
  // Mise à jour du jeu (appelé chaque frame)
  update: (deltaTime) => {
    const { regiments } = get()
    
    set({
      regiments: regiments.map(regiment => {
        let newMoral = regiment.moral
        let routing = false
        
        // Vérifier si le régiment est en train de fuir
        if (regiment.moral <= 0) {
          routing = true
          newMoral = Math.max(-50, regiment.moral - deltaTime * 10)
        }
        
        // Mettre à jour chaque soldat
        const updatedSoldiers = regiment.soldiers.map(soldier => {
          if (soldier.hp <= 0) return soldier
          
          let newX = soldier.x
          let newY = soldier.y
          let newState = soldier.state
          
          if (routing) {
            // Fuir dans la direction opposée au combat
            newState = 'routing'
            const fleeX = soldier.x + (Math.random() - 0.5) * 200
            const fleeY = soldier.y + 200
            const dx = fleeX - soldier.x
            const dy = fleeY - soldier.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist > 1) {
              const speed = regiment.speed * 1.5
              newX += (dx / dist) * speed * deltaTime
              newY += (dy / dist) * speed * deltaTime
            }
          } else if (soldier.targetX !== null && soldier.targetY !== null) {
            // Se déplacer vers la cible
            const dx = soldier.targetX - soldier.x
            const dy = soldier.targetY - soldier.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist > 2) {
              newState = 'moving'
              const speed = regiment.speed
              newX += (dx / dist) * speed * deltaTime
              newY += (dy / dist) * speed * deltaTime
            } else {
              newState = 'idle'
            }
          }
          
          return {
            ...soldier,
            x: newX,
            y: newY,
            state: newState
          }
        })
        
        // Calculer le centre du régiment
        const aliveSoldiers = updatedSoldiers.filter(s => s.hp > 0)
        const centerX = aliveSoldiers.reduce((sum, s) => sum + s.x, 0) / aliveSoldiers.length || regiment.x
        const centerY = aliveSoldiers.reduce((sum, s) => sum + s.y, 0) / aliveSoldiers.length || regiment.y
        
        return {
          ...regiment,
          x: centerX,
          y: centerY,
          soldiers: updatedSoldiers,
          moral: newMoral
        }
      })
    })
    
    // Gestion du combat
    get().processCombat(deltaTime)
  },
  
  processCombat: (deltaTime) => {
    const { regiments } = get()
    const updatedRegiments = [...regiments]
    
    for (let i = 0; i < updatedRegiments.length; i++) {
      const attacker = updatedRegiments[i]
      if (!attacker.targetEnemy) continue
      
      const target = updatedRegiments.find(r => r.id === attacker.targetEnemy)
      if (!target || target.player === attacker.player) continue
      
      // Pour chaque soldat vivant de l'attaquant
      attacker.soldiers.forEach(soldier => {
        if (soldier.hp <= 0 || soldier.state === 'routing') return
        
        // Trouver l'ennemi le plus proche
        let closestEnemy = null
        let closestDist = attacker.range
        
        target.soldiers.forEach(enemySoldier => {
          if (enemySoldier.hp <= 0) return
          const dx = enemySoldier.x - soldier.x
          const dy = enemySoldier.y - soldier.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < closestDist) {
            closestDist = dist
            closestEnemy = enemySoldier
          }
        })
        
        // Attaquer si à portée
        if (closestEnemy && Math.random() < 0.1) { // 10% de chance par frame
          const damage = Math.max(1, attacker.damage - target.armor)
          closestEnemy.hp -= damage
          
          // Baisser le moral du régiment cible
          const targetRegimentIndex = updatedRegiments.findIndex(r => r.id === target.id)
          if (targetRegimentIndex !== -1) {
            updatedRegiments[targetRegimentIndex].moral -= damage * 0.1
          }
        }
      })
    }
    
    // Nettoyer les morts et mettre à jour
    set({ regiments: updatedRegiments })
  },
  
  setFormation: (id, formation) => {
    const { regiments, moveRegiment } = get()
    const regiment = regiments.find(r => r.id === id)
    if (regiment) {
      moveRegiment(id, regiment.x, regiment.y, formation)
    }
  },
  
  stopRegiment: (id) => {
    set((state) => ({
      regiments: state.regiments.map(r => 
        r.id === id ? { ...r, targetX: null, targetY: null, targetEnemy: null } : r
      )
    }))
  }
}))

export default useGameStore

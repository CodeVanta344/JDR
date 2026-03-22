import React, { useEffect, useRef, useCallback, useState } from 'react'
import useGameStore, { FORMATIONS, UNIT_TYPES } from './store.js'

const CANVAS_WIDTH = 4000
const CANVAS_HEIGHT = 3000
const FOG_RADIUS = 400

// Couleurs par type d'unité
const UNIT_COLORS = {
  SWORDSMAN: '#e74c3c',
  SPEARMAN: '#3498db',
  ARCHER: '#2ecc71',
  CAVALRY: '#f39c12',
  SHIELD: '#9b59b6'
}

const Game = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const lastTimeRef = useRef(0)
  const keysRef = useRef({})
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, startX: 0, startY: 0 })
  
  const [showDebug, setShowDebug] = useState(false)
  const [formation, setFormation] = useState(FORMATIONS.LINE)
  
  const {
    camera, setCamera,
    selectedRegiments, selectRegiment, selectMultiple, clearSelection,
    dragBox, setDragBox,
    regiments, addRegiment, moveRegiment, attackRegiment, setFormation: setRegimentFormation,
    update, stopRegiment
  } = useGameStore()

  // Convertir coordonnées écran -> monde
  const screenToWorld = useCallback((screenX, screenY) => {
    return {
      x: (screenX - window.innerWidth / 2) / camera.zoom + camera.x,
      y: (screenY - window.innerHeight / 2) / camera.zoom + camera.y
    }
  }, [camera])

  // Convertir coordonnées monde -> écran
  const worldToScreen = useCallback((worldX, worldY) => {
    return {
      x: (worldX - camera.x) * camera.zoom + window.innerWidth / 2,
      y: (worldY - camera.y) * camera.zoom + window.innerHeight / 2
    }
  }, [camera])

  // Initialiser la scène
  useEffect(() => {
    // Ajouter régiments joueur
    addRegiment('SWORDSMAN', 500, 500, 'player', 40)
    addRegiment('SPEARMAN', 500, 700, 'player', 40)
    addRegiment('ARCHER', 500, 900, 'player', 30)
    addRegiment('CAVALRY', 300, 600, 'player', 20)
    
    // Ajouter régiments ennemis
    addRegiment('SWORDSMAN', 1500, 500, 'enemy', 40)
    addRegiment('SWORDSMAN', 1500, 700, 'enemy', 40)
    addRegiment('SPEARMAN', 1700, 600, 'enemy', 40)
    addRegiment('CAVALRY', 1600, 900, 'enemy', 20)
    
    // Centrer la caméra
    setCamera({ x: 1000, y: 600, zoom: 0.8 })
  }, [])

  // Gestion du clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysRef.current[e.key.toLowerCase()] = true
      
      // Formation shortcuts
      if (e.key === '1') setFormation(FORMATIONS.LINE)
      if (e.key === '2') setFormation(FORMATIONS.SQUARE)
      if (e.key === '3') setFormation(FORMATIONS.WEDGE)
      if (e.key === '4') setFormation(FORMATIONS.LOOSE)
      
      // Stop (S key)
      if (e.key === 's' || e.key === 'S') {
        selectedRegiments.forEach(id => stopRegiment(id))
      }
      
      // Select all (Ctrl+A)
      if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault()
        const playerRegiments = regiments.filter(r => r.player === 'player').map(r => r.id)
        selectMultiple(playerRegiments)
      }
      
      // Toggle debug
      if (e.key === 'F1') {
        e.preventDefault()
        setShowDebug(prev => !prev)
      }
    }
    
    const handleKeyUp = (e) => {
      keysRef.current[e.key.toLowerCase()] = false
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [regiments, selectedRegiments])

  // Gestion de la souris
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      mouseRef.current = { 
        ...mouseRef.current, 
        isDown: true, 
        startX: x, 
        startY: y,
        x, y
      }
      
      // Clic gauche simple
      if (e.button === 0) {
        const worldPos = screenToWorld(x, y)
        
        // Vérifier si on clique sur un régiment
        const clickedRegiment = regiments.find(r => {
          const screenPos = worldToScreen(r.x, r.y)
          const dx = x - screenPos.x
          const dy = y - screenPos.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          return dist < 50 * camera.zoom
        })
        
        if (clickedRegiment) {
          if (clickedRegiment.player === 'player') {
            selectRegiment(clickedRegiment.id, e.ctrlKey)
          } else if (selectedRegiments.length > 0) {
            // Ordre d'attaque
            selectedRegiments.forEach(id => attackRegiment(id, clickedRegiment.id))
          }
        } else if (!e.ctrlKey) {
          clearSelection()
        }
      }
      
      // Clic droit = déplacer
      if (e.button === 2) {
        e.preventDefault()
        const worldPos = screenToWorld(x, y)
        
        selectedRegiments.forEach((id, index) => {
          // Offset pour éviter que tous les régiments se superposent
          const offsetX = (index % 3) * 100
          const offsetY = Math.floor(index / 3) * 100
          moveRegiment(id, worldPos.x + offsetX, worldPos.y + offsetY, formation)
        })
      }
    }
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      mouseRef.current.x = x
      mouseRef.current.y = y
      
      // Mise à jour du drag box
      if (mouseRef.current.isDown && e.buttons === 1) {
        const startWorld = screenToWorld(mouseRef.current.startX, mouseRef.current.startY)
        const currentWorld = screenToWorld(x, y)
        
        setDragBox({
          x: Math.min(startWorld.x, currentWorld.x),
          y: Math.min(startWorld.y, currentWorld.y),
          width: Math.abs(currentWorld.x - startWorld.x),
          height: Math.abs(currentWorld.y - startWorld.y)
        })
      }
      
      // Caméra aux bords
      const edgeThreshold = 50
      const camSpeed = 15 / camera.zoom
      
      if (x < edgeThreshold) setCamera(prev => ({ ...prev, x: prev.x - camSpeed }))
      if (x > window.innerWidth - edgeThreshold) setCamera(prev => ({ ...prev, x: prev.x + camSpeed }))
      if (y < edgeThreshold) setCamera(prev => ({ ...prev, y: prev.y - camSpeed }))
      if (y > window.innerHeight - edgeThreshold) setCamera(prev => ({ ...prev, y: prev.y + camSpeed }))
    }
    
    const handleMouseUp = (e) => {
      if (dragBox) {
        // Sélectionner les régiments dans la box
        const selected = regiments.filter(r => {
          if (r.player !== 'player') return false
          return r.x >= dragBox.x && r.x <= dragBox.x + dragBox.width &&
                 r.y >= dragBox.y && r.y <= dragBox.y + dragBox.height
        }).map(r => r.id)
        
        if (selected.length > 0) {
          selectMultiple(selected)
        }
        
        setDragBox(null)
      }
      
      mouseRef.current.isDown = false
    }
    
    const handleWheel = (e) => {
      e.preventDefault()
      const zoomSpeed = 0.1
      const newZoom = Math.max(0.3, Math.min(2, camera.zoom - e.deltaY * 0.001))
      setCamera(prev => ({ ...prev, zoom: newZoom }))
    }
    
    const handleContextMenu = (e) => e.preventDefault()
    
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('wheel', handleWheel)
    canvas.addEventListener('contextmenu', handleContextMenu)
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('wheel', handleWheel)
      canvas.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [camera, regiments, selectedRegiments, dragBox, formation])

  // Boucle de jeu
  useEffect(() => {
    const gameLoop = (timestamp) => {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp
      
      // Limite à 60 FPS pour la logique
      if (deltaTime < 0.1) {
        update(deltaTime)
      }
      
      // Mouvement caméra WASD
      const camSpeed = 10 / camera.zoom
      let newCamX = camera.x
      let newCamY = camera.y
      
      if (keysRef.current['w']) newCamY -= camSpeed
      if (keysRef.current['s']) newCamY += camSpeed
      if (keysRef.current['a']) newCamX -= camSpeed
      if (keysRef.current['d']) newCamX += camSpeed
      
      if (newCamX !== camera.x || newCamY !== camera.y) {
        setCamera({ ...camera, x: newCamX, y: newCamY })
      }
      
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    
    animationRef.current = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animationRef.current)
  }, [camera, update])

  // Rendu
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // Fond
    ctx.fillStyle = '#2d3436'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Grille
    ctx.strokeStyle = '#3d3d3d'
    ctx.lineWidth = 1
    const gridSize = 100 * camera.zoom
    const offsetX = (window.innerWidth / 2 - camera.x * camera.zoom) % gridSize
    const offsetY = (window.innerHeight / 2 - camera.y * camera.zoom) % gridSize
    
    ctx.beginPath()
    for (let x = offsetX; x < canvas.width; x += gridSize) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
    }
    for (let y = offsetY; y < canvas.height; y += gridSize) {
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
    }
    ctx.stroke()
    
    // Brouillard de guerre
    const playerRegiments = regiments.filter(r => r.player === 'player')
    
    // Masque pour le brouillard
    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Zones visibles
    ctx.globalCompositeOperation = 'destination-out'
    playerRegiments.forEach(r => {
      const screenPos = worldToScreen(r.x, r.y)
      const radius = FOG_RADIUS * camera.zoom
      
      const gradient = ctx.createRadialGradient(
        screenPos.x, screenPos.y, 0,
        screenPos.x, screenPos.y, radius
      )
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(screenPos.x, screenPos.y, radius, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.restore()
    
    // Rendre les régiments
    regiments.forEach(regiment => {
      const isVisible = playerRegiments.some(pr => {
        const dist = Math.sqrt(
          Math.pow(pr.x - regiment.x, 2) + 
          Math.pow(pr.y - regiment.y, 2)
        )
        return dist < FOG_RADIUS || regiment.player === 'player'
      })
      
      if (!isVisible && regiment.player === 'enemy') return
      
      const screenPos = worldToScreen(regiment.x, regiment.y)
      const isSelected = selectedRegiments.includes(regiment.id)
      
      // Soldats individuels
      regiment.soldiers.forEach(soldier => {
        if (soldier.hp <= 0) return
        
        const soldierScreen = worldToScreen(soldier.x, soldier.y)
        const size = regiment.type === 'CAVALRY' ? 6 : 4
        
        // Couleur selon état
        let color = UNIT_COLORS[regiment.type]
        if (soldier.state === 'routing') color = '#7f8c8d'
        if (soldier.hp < regiment.maxHp * 0.3) color = '#c0392b'
        
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(soldierScreen.x, soldierScreen.y, size * camera.zoom, 0, Math.PI * 2)
        ctx.fill()
        
        // Bordure pour distinction joueur/ennemi
        ctx.strokeStyle = regiment.player === 'player' ? '#3498db' : '#e74c3c'
        ctx.lineWidth = 1
        ctx.stroke()
      })
      
      // Cercle de sélection
      if (isSelected) {
        ctx.strokeStyle = '#f1c40f'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(screenPos.x, screenPos.y, 40 * camera.zoom, 0, Math.PI * 2)
        ctx.stroke()
      }
      
      // Indicateur de moral
      const moralWidth = 60 * camera.zoom
      const moralHeight = 4 * camera.zoom
      ctx.fillStyle = '#2c3e50'
      ctx.fillRect(screenPos.x - moralWidth/2, screenPos.y - 60 * camera.zoom, moralWidth, moralHeight)
      
      const moralColor = regiment.moral > 70 ? '#2ecc71' : regiment.moral > 30 ? '#f39c12' : '#e74c3c'
      ctx.fillStyle = moralColor
      ctx.fillRect(screenPos.x - moralWidth/2, screenPos.y - 60 * camera.zoom, moralWidth * (regiment.moral / 100), moralHeight)
      
      // Icône de formation
      ctx.fillStyle = 'white'
      ctx.font = `${10 * camera.zoom}px Arial`
      ctx.textAlign = 'center'
      const formationIcons = {
        [FORMATIONS.LINE]: '═',
        [FORMATIONS.SQUARE]: '▪',
        [FORMATIONS.WEDGE]: '◄',
        [FORMATIONS.LOOSE]: '⋯'
      }
      ctx.fillText(formationIcons[regiment.formation] || '═', screenPos.x, screenPos.y - 70 * camera.zoom)
    })
    
    // Drag box
    if (dragBox) {
      const screenStart = worldToScreen(dragBox.x, dragBox.y)
      const screenEnd = worldToScreen(dragBox.x + dragBox.width, dragBox.y + dragBox.height)
      
      ctx.strokeStyle = '#3498db'
      ctx.lineWidth = 2
      ctx.fillStyle = 'rgba(52, 152, 219, 0.2)'
      ctx.fillRect(screenStart.x, screenStart.y, screenEnd.x - screenStart.x, screenEnd.y - screenStart.y)
      ctx.strokeRect(screenStart.x, screenStart.y, screenEnd.x - screenStart.x, screenEnd.y - screenStart.y)
    }
    
    // Debug info
    if (showDebug) {
      ctx.fillStyle = 'white'
      ctx.font = '14px monospace'
      ctx.textAlign = 'left'
      let y = 20
      ctx.fillText(`Camera: ${camera.x.toFixed(0)}, ${camera.y.toFixed(0)} (zoom: ${camera.zoom.toFixed(2)})`, 10, y)
      y += 20
      ctx.fillText(`Selected: ${selectedRegiments.length}`, 10, y)
      y += 20
      regiments.forEach((r, i) => {
        const alive = r.soldiers.filter(s => s.hp > 0).length
        ctx.fillText(`${r.type} (${r.player}): ${alive}/${r.soldiers.length} moral:${r.moral.toFixed(0)}`, 10, y)
        y += 20
      })
    }
  }, [camera, regiments, selectedRegiments, dragBox, worldToScreen, showDebug])
  
  const changeFormation = (newFormation) => {
    setFormation(newFormation)
    selectedRegiments.forEach(id => {
      const regiment = regiments.find(r => r.id === id)
      if (regiment) {
        setRegimentFormation(id, newFormation)
      }
    })
  }
  
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', cursor: mouseRef.current.isDown ? 'crosshair' : 'default' }}
      />
      
      {/* UI - Barre de formations */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '10px 20px',
        borderRadius: '8px'
      }}>
        {Object.values(FORMATIONS).map((f) => (
          <button
            key={f}
            onClick={() => changeFormation(f)}
            style={{
              padding: '8px 16px',
              background: formation === f ? '#3498db' : '#2c3e50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              textTransform: 'uppercase'
            }}
          >
            {f === FORMATIONS.LINE && '1: Ligne'}
            {f === FORMATIONS.SQUARE && '2: Carré'}
            {f === FORMATIONS.WEDGE && '3: Coin'}
            {f === FORMATIONS.LOOSE && '4: Dispersé'}
          </button>
        ))}
      </div>
      
      {/* UI - Instructions */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '13px',
        lineHeight: '1.6',
        maxWidth: '300px'
      }}>
        <h3 style={{ marginBottom: '10px', color: '#3498db' }}>⚔️ Commandes</h3>
        <p><strong>WASD / Bords:</strong> Caméra</p>
        <p><strong>Molette:</strong> Zoom</p>
        <p><strong>Clic gauche:</strong> Sélectionner</p>
        <p><strong>Drag:</strong> Sélection multiple</p>
        <p><strong>Ctrl+A:</strong> Tout sélectionner</p>
        <p><strong>Clic droit:</strong> Déplacer / Attaquer</p>
        <p><strong>S:</strong> Arrêter</p>
        <p><strong>1-4:</strong> Formations</p>
        <p><strong>F1:</strong> Debug</p>
      </div>
      
      {/* UI - Statut */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '13px'
      }}>
        <div>Régiments: {regiments.filter(r => r.player === 'player').length} alliés</div>
        <div>{regiments.filter(r => r.player === 'enemy').length} ennemis</div>
        <div style={{ marginTop: '10px', color: '#f1c40f' }}>
          Sélectionnés: {selectedRegiments.length}
        </div>
      </div>
    </div>
  )
}

export default Game

import React, { useState, useEffect } from 'react';
import { PlayerCharacter, getParty, addCharacter, updateCharacter, deleteCharacter } from '../lib/partyState';

export function PartyManager() {
  const [party, setParty] = useState<PlayerCharacter[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [className, setClassName] = useState('');
  const [level, setLevel] = useState(1);
  const [maxHp, setMaxHp] = useState(10);
  const [ac, setAc] = useState(10);
  const [passivePerception, setPassivePerception] = useState(10);
  const [initiativeBonus, setInitiativeBonus] = useState(0);

  useEffect(() => {
    setParty(getParty());
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newChar = addCharacter({
      name,
      race,
      className,
      level,
      maxHp,
      hp: maxHp,
      ac,
      passivePerception,
      initiativeBonus
    });
    setParty([...party, newChar]);
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setRace('');
    setClassName('');
    setLevel(1);
    setMaxHp(10);
    setAc(10);
    setPassivePerception(10);
    setInitiativeBonus(0);
  };

  const handleDelete = (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce personnage ?')) {
      deleteCharacter(id);
      setParty(party.filter(p => p.id !== id));
    }
  };

  const updateProp = (id: string, prop: keyof PlayerCharacter, value: any) => {
    updateCharacter(id, { [prop]: value });
    setParty(party.map(p => p.id === id ? { ...p, [prop]: value } : p));
  };

  const adjustHp = (id: string, delta: number) => {
    const char = party.find(p => p.id === id);
    if (!char) return;
    const newHp = Math.max(0, Math.min(char.maxHp, char.hp + delta));
    updateProp(id, 'hp', newHp);
  };

  const getHpColor = (hp: number, maxHp: number) => {
    const pct = maxHp > 0 ? (hp / maxHp) * 100 : 0;
    if (pct > 60) return '#22c55e';
    if (pct > 30) return '#eab308';
    return '#ef4444';
  };

  const getHpPct = (hp: number, maxHp: number) => {
    return maxHp > 0 ? (hp / maxHp) * 100 : 0;
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>🛡️ Groupe d'Aventuriers</h1>
          <p>Gérez les personnages des joueurs pour un accès rapide pendant la partie.</p>
        </div>
        <button
          className={isAdding ? 'btn btn-red' : 'btn btn-gold'}
          onClick={() => { setIsAdding(!isAdding); setEditingId(null); if (isAdding) resetForm(); }}
        >
          {isAdding ? '✕ Annuler' : '➕ Ajouter un Personnage'}
        </button>
      </div>

      {/* === Add Form === */}
      {isAdding && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Nouveau Personnage</h3>
          <form onSubmit={handleAddSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              <div>
                <label className="stat-label">Nom *</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%' }} placeholder="Aldric Flamme-Noire" />
              </div>
              <div>
                <label className="stat-label">Race</label>
                <input type="text" value={race} onChange={e => setRace(e.target.value)} style={{ width: '100%' }} placeholder="Humain" />
              </div>
              <div>
                <label className="stat-label">Classe</label>
                <input type="text" value={className} onChange={e => setClassName(e.target.value)} style={{ width: '100%' }} placeholder="Paladin" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 16 }}>
              <div>
                <label className="stat-label">Niveau</label>
                <input required type="number" min="1" max="20" value={level} onChange={e => setLevel(parseInt(e.target.value) || 1)} style={{ width: '100%' }} />
              </div>
              <div>
                <label className="stat-label">PV Max</label>
                <input required type="number" min="1" value={maxHp} onChange={e => setMaxHp(parseInt(e.target.value) || 1)} style={{ width: '100%' }} />
              </div>
              <div>
                <label className="stat-label">Classe d'Armure</label>
                <input required type="number" value={ac} onChange={e => setAc(parseInt(e.target.value) || 10)} style={{ width: '100%' }} />
              </div>
              <div>
                <label className="stat-label">Perception Pass.</label>
                <input required type="number" value={passivePerception} onChange={e => setPassivePerception(parseInt(e.target.value) || 10)} style={{ width: '100%' }} />
              </div>
              <div>
                <label className="stat-label">Bonus Init.</label>
                <input required type="number" value={initiativeBonus} onChange={e => setInitiativeBonus(parseInt(e.target.value) || 0)} style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-gold">✓ Enregistrer</button>
            </div>
          </form>
        </div>
      )}

      {/* === Empty State === */}
      {party.length === 0 && !isAdding && (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🛡️</div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: 8 }}>Aucun personnage</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
            Ajoutez les personnages de vos joueurs pour suivre leurs PV, CA et plus encore.
            <br/>Ils pourront être importés automatiquement dans le <strong style={{ color: 'var(--gold)' }}>Combat Tracker</strong>.
          </p>
          <button className="btn btn-gold" onClick={() => setIsAdding(true)}>
            ➕ Ajouter un Personnage
          </button>
        </div>
      )}

      {/* === Party Grid === */}
      {party.length > 0 && (
        <>
          {/* Party summary bar */}
          <div className="card" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <div>
                <span className="stat-label">Joueurs</span>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--gold)' }}>{party.length}</div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
                <span className="stat-label">Niveau Moyen</span>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                  {Math.round(party.reduce((s, p) => s + p.level, 0) / party.length)}
                </div>
              </div>
              <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
                <span className="stat-label">Perception Min.</span>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--blue)' }}>
                  {Math.min(...party.map(p => p.passivePerception))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-grid">
            {party.map((char) => {
              const hpPct = getHpPct(char.hp, char.maxHp);
              const hpColor = getHpColor(char.hp, char.maxHp);
              const isDead = char.hp === 0;

              return (
                <div key={char.id} className="card" style={{ opacity: isDead ? 0.6 : 1 }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1.15rem',
                        color: isDead ? 'var(--text-muted)' : 'var(--gold)',
                        textDecoration: isDead ? 'line-through' : 'none'
                      }}>
                        {char.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        {[char.race, char.className].filter(Boolean).join(' ')} {char.level > 0 && `(Niv. ${char.level})`}
                      </div>
                    </div>
                    <button
                      className="btn"
                      style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#ef4444' }}
                      onClick={() => handleDelete(char.id)}
                      title="Supprimer"
                    >🗑️</button>
                  </div>

                  {/* HP Section */}
                  <div style={{
                    background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: 12, marginBottom: 12
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span className="stat-label">Points de Vie</span>
                      <span style={{ color: hpColor, fontWeight: 700, fontSize: '1rem' }}>
                        {char.hp} / {char.maxHp}
                      </span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                      <div style={{
                        height: '100%', width: `${hpPct}%`, background: hpColor,
                        borderRadius: 4, transition: 'width 0.3s'
                      }} />
                    </div>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                      <button className="btn" style={{ padding: '2px 10px', fontSize: '0.75rem' }} onClick={() => adjustHp(char.id, -10)}>-10</button>
                      <button className="btn" style={{ padding: '2px 10px', fontSize: '0.75rem' }} onClick={() => adjustHp(char.id, -5)}>-5</button>
                      <button className="btn" style={{ padding: '2px 10px', fontSize: '0.75rem' }} onClick={() => adjustHp(char.id, -1)}>-1</button>
                      <button className="btn" style={{ padding: '2px 10px', fontSize: '0.75rem' }} onClick={() => adjustHp(char.id, +1)}>+1</button>
                      <button className="btn" style={{ padding: '2px 10px', fontSize: '0.75rem' }} onClick={() => adjustHp(char.id, +5)}>+5</button>
                      <button className="btn" style={{ padding: '2px 10px', fontSize: '0.75rem' }} onClick={() => adjustHp(char.id, +10)}>+10</button>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="stat-row" style={{ justifyContent: 'space-around' }}>
                    <div className="stat-block">
                      <div className="stat-label">CA</div>
                      <div className="stat-value" style={{ color: 'var(--blue)' }}>{char.ac}</div>
                    </div>
                    <div className="stat-block">
                      <div className="stat-label">Percep.</div>
                      <div className="stat-value" style={{ color: 'var(--cyan)' }}>{char.passivePerception}</div>
                    </div>
                    <div className="stat-block">
                      <div className="stat-label">Init.</div>
                      <div className="stat-value" style={{ color: 'var(--gold)' }}>
                        {char.initiativeBonus >= 0 ? `+${char.initiativeBonus}` : char.initiativeBonus}
                      </div>
                    </div>
                  </div>

                  {/* Edit trigger */}
                  <div style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 10, textAlign: 'center' }}>
                    <button
                      className="btn"
                      style={{ fontSize: '0.75rem', padding: '4px 14px' }}
                      onClick={() => setEditingId(editingId === char.id ? null : char.id)}
                    >
                      {editingId === char.id ? '▲ Fermer' : '✏️ Modifier'}
                    </button>
                  </div>

                  {/* Inline Edit */}
                  {editingId === char.id && (
                    <div style={{
                      marginTop: 10, padding: 12, background: 'rgba(0,0,0,0.15)',
                      borderRadius: 'var(--radius-md)', display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)', gap: 8
                    }}>
                      <div>
                        <label className="stat-label">Nom</label>
                        <input value={char.name} onChange={e => updateProp(char.id, 'name', e.target.value)} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label className="stat-label">Classe</label>
                        <input value={char.className} onChange={e => updateProp(char.id, 'className', e.target.value)} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label className="stat-label">Race</label>
                        <input value={char.race} onChange={e => updateProp(char.id, 'race', e.target.value)} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label className="stat-label">Niveau</label>
                        <input type="number" min="1" max="20" value={char.level} onChange={e => updateProp(char.id, 'level', parseInt(e.target.value) || 1)} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label className="stat-label">PV Max</label>
                        <input type="number" min="1" value={char.maxHp} onChange={e => updateProp(char.id, 'maxHp', parseInt(e.target.value) || 1)} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label className="stat-label">CA</label>
                        <input type="number" value={char.ac} onChange={e => updateProp(char.id, 'ac', parseInt(e.target.value) || 10)} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label className="stat-label">Perception Pass.</label>
                        <input type="number" value={char.passivePerception} onChange={e => updateProp(char.id, 'passivePerception', parseInt(e.target.value) || 10)} style={{ width: '100%' }} />
                      </div>
                      <div>
                        <label className="stat-label">Bonus Init.</label>
                        <input type="number" value={char.initiativeBonus} onChange={e => updateProp(char.id, 'initiativeBonus', parseInt(e.target.value) || 0)} style={{ width: '100%' }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

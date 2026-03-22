import { useState } from 'react';
import { useDeveloperAuth } from '../hooks/useDeveloperAuth';
import { LOCATION_BACKGROUNDS } from '../lore';
import { supabase } from '../supabaseClient';

const LOCATION_POINTS_OF_INTEREST = {
    "Aethelgard": [
        { id: 'palais_royal', name: 'Palais Royal', description: 'Résidence du Roi Aldric III. Architecture grandiose, salles du trône dorées.' },
        { id: 'academie_arcane', name: 'Académie Arcane', description: "Tour d'ivoire des mages. Bibliothèque immense, laboratoires enchantés." },
        { id: 'quartier_marchand', name: 'Quartier Marchand', description: 'Bazars colorés, marchands du monde entier. On y trouve tout.' },
        { id: 'temple_lumiere', name: 'Temple de la Lumière', description: 'Cathédrale majestueuse vouée aux dieux. Vitraux sacrés, cryptes anciennes.' },
        { id: 'arene_champion', name: 'Arène du Champion', description: 'Colisée où gladiateurs et aventuriers prouvent leur valeur.' },
        { id: 'quartier_ombres', name: 'Quartier des Ombres', description: 'Ruelles sombres contrôlées par Guilde des Voleurs. Tavernes louches, marché noir.' }
    ],
    "Port d'Azur": [
        { id: 'quais_commercants', name: 'Quais des Commerçants', description: 'Marchands de poissons et épices. Animation constante, odeurs marines.' },
        { id: 'temple_eau', name: "Temple de l'Eau", description: 'Sanctuaire dédié à la déesse des mers. Prêtres en robes bleues.' },
        { id: 'port_royal', name: 'Port Royal', description: 'Grand port commercial avec navires de toutes les contrées.' }
    ],
    "Forgefer": [
        { id: 'forges_ancestrales', name: 'Forges Ancestrales', description: 'Fourneaux géants, marteaux qui résonnent. Nains au travail perpétuel.' },
        { id: 'salle_armures', name: 'Salle des Armures', description: "Hall d'exposition des chefs-d'œuvre. Armures légendaires derrière vitres." },
        { id: 'mine_cristal', name: 'Mine de Cristal', description: 'Galerie profonde extrayant le minerai précieux.' }
    ],
    "Combralac": [
        { id: 'auberge_lac', name: "Auberge du Lac", description: 'Terrasse sur l\'eau, pêche fraîche. Calme et sérénité.' },
        { id: 'pont_vieux', name: 'Pont Vieux', description: 'Pont de pierre millénaire traversant le lac tranquille.' },
        { id: 'ermitage', name: 'Ermitage', description: 'Petite chapelle isolée où les moines méditent en silence.' }
    ],
    "Carrefour": [
        { id: 'relais', name: 'Relais', description: 'Halte pour voyageurs et caravanes. Bière et repos.' },
        { id: 'poste_garde', name: 'Poste de Garde', description: 'Tour de guet surveillant les routes commerciales.' },
        { id: 'marché_campagnard', name: 'Marché Campagnard', description: 'Marché local avec produits des fermes environnantes.' }
    ],
    "Camp des Mineurs": [
        { id: 'campement', name: 'Campement', description: 'Tentes et baraquements des prospecteurs de minerai.' },
        { id: 'excavations', name: 'Excavations', description: 'Site de fouille récent, traces de pioches et de pelles.' },
        { id: 'magasin_provision', name: 'Magasin de Provisions', description: 'Boutique fournissant outils et vivres aux mineurs.' }
    ],
    "Havre-du-Bois": [
        { id: 'place_village', name: 'Place du Village', description: 'Centre du village avec fontaine et vieux chêne.' },
        { id: 'chapelle', name: 'Chapelle', description: 'Petite église en bois avec vitraux colorés.' },
        { id: 'clairiere', name: 'Clairière', description: 'Espace dégagé à la lisière de la forêt.' }
    ],
    "Marais-Salé": [
        { id: 'ilot', name: 'Îlot', description: 'Terre ferme au milieu des eaux stagnantes.' },
        { id: 'ruines_temple', name: 'Ruines du Temple', description: 'Vestiges engloutis par les marais.' },
        { id: 'repaire_bandits', name: 'Repaire de Bandits', description: 'Campement dissimulé dans la végétation dense.' }
    ],
    "Forteresse d'Ombre": [
        { id: 'salle_trone', name: 'Salle du Trône', description: 'Antique salle du trône envahie par la corruption.' },
        { id: 'donjon', name: 'Donjon', description: 'Cachots profonds où résonnent les chaînes.' },
        { id: 'sanctuaire_interdit', name: "Sanctuaire Interdit", description: 'Chambre secrète contenant des secrets anciens et dangereux.' }
    ]
};

export function DeveloperPanel({ onClose }) {
    const { isAuthenticated, login, logout } = useDeveloperAuth();
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Aethelgard');
    const [uploading, setUploading] = useState({});
    const [uploadSuccess, setUploadSuccess] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(loginId, loginPassword);
        if (!success) {
            setLoginError('ID ou mot de passe incorrect');
        }
    };

    const handleUpload = async (poiId, file) => {
        if (!file) return;

        setUploading(prev => ({ ...prev, [poiId]: true }));

        try {
            const fileName = `maps/${selectedLocation.toLowerCase().replace(/\s+/g, '_')}/${poiId}_${Date.now()}.png`;

            const { data, error } = await supabase.storage
                .from('game-maps')
                .upload(fileName, file, {
                    contentType: 'image/png',
                    upsert: true
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('game-maps')
                .getPublicUrl(fileName);

            setUploadSuccess(prev => ({ ...prev, [poiId]: publicUrl }));
            setTimeout(() => {
                setUploadSuccess(prev => {
                    const next = { ...prev };
                    delete next[poiId];
                    return next;
                });
            }, 3000);
        } catch (err) {
            console.error('Upload error:', err);
            alert('Erreur lors de l\'upload: ' + err.message);
        } finally {
            setUploading(prev => ({ ...prev, [poiId]: false }));
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.95)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
                    border: '2px solid #d4af37',
                    borderRadius: '12px',
                    padding: '2rem',
                    maxWidth: '400px',
                    width: '90%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
                }}>
                    <h2 style={{
                        color: '#d4af37',
                        fontFamily: 'Cinzel, serif',
                        textAlign: 'center',
                        marginBottom: '1.5rem'
                    }}>
                        🔒 Accès Level Designer
                    </h2>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ color: '#888', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                                ID
                            </label>
                            <input
                                type="text"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: '1px solid #444',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                                placeholder="Entrez votre ID"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ color: '#888', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: 'rgba(0,0,0,0.5)',
                                    border: '1px solid #444',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontSize: '1rem'
                                }}
                                placeholder="Entrez le mot de passe"
                            />
                        </div>

                        {loginError && (
                            <div style={{
                                color: '#ff4444',
                                fontSize: '0.9rem',
                                textAlign: 'center',
                                marginBottom: '1rem',
                                padding: '8px',
                                background: 'rgba(255,68,68,0.1)',
                                borderRadius: '4px'
                            }}>
                                {loginError}
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'linear-gradient(135deg, #d4af37, #fbeea8)',
                                border: 'none',
                                borderRadius: '6px',
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                marginBottom: '1rem'
                            }}
                        >
                            Se connecter
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'transparent',
                                border: '1px solid #666',
                                borderRadius: '6px',
                                color: '#888',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}
                        >
                            Annuler
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const pointsOfInterest = LOCATION_POINTS_OF_INTEREST[selectedLocation] || [];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5,5,8,0.98)',
            zIndex: 9998,
            overflow: 'auto',
            padding: '2rem'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(212,175,55,0.3)'
            }}>
                <div>
                    <h1 style={{
                        color: '#d4af37',
                        fontFamily: 'Cinzel, serif',
                        margin: 0,
                        fontSize: '1.8rem'
                    }}>
                        🗺️ Atlas - Level Designer
                    </h1>
                    <p style={{ color: '#888', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                        Upload des maps PNG pour les points d'intérêt
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: '#5dff98', fontSize: '0.9rem' }}>
                        ✅ Connecté
                    </span>
                    <button
                        onClick={() => { logout(); onClose(); }}
                        style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            border: '1px solid #ff4444',
                            color: '#ff4444',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Déconnexion
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            border: '1px solid #888',
                            color: '#888',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        ✕ Fermer
                    </button>
                </div>
            </div>

            {/* Location Selector */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                    Sélectionner une ville/lieu
                </label>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{
                        padding: '12px 16px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid #d4af37',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '1rem',
                        minWidth: '250px',
                        cursor: 'pointer'
                    }}
                >
                    {Object.keys(LOCATION_POINTS_OF_INTEREST).map(location => (
                        <option key={location} value={location} style={{ background: '#1a1a2e' }}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            {/* Points of Interest Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem'
            }}>
                {pointsOfInterest.map(poi => (
                    <div
                        key={poi.id}
                        style={{
                            background: 'linear-gradient(135deg, rgba(26,26,46,0.9) 0%, rgba(15,15,26,0.95) 100%)',
                            border: '1px solid rgba(212,175,55,0.3)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ marginBottom: '1rem' }}>
                            <h3 style={{
                                color: '#fbeea8',
                                fontFamily: 'Cinzel, serif',
                                margin: '0 0 0.5rem 0',
                                fontSize: '1.2rem'
                            }}>
                                {poi.name}
                            </h3>
                            <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                                {poi.description}
                            </p>
                        </div>

                        {/* Upload Section */}
                        <div style={{
                            borderTop: '1px solid rgba(212,175,55,0.2)',
                            paddingTop: '1rem',
                            marginTop: '1rem'
                        }}>
                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '12px',
                                    background: uploadSuccess[poi.id]
                                        ? 'rgba(93,255,152,0.2)'
                                        : 'rgba(212,175,55,0.1)',
                                    border: `2px dashed ${uploadSuccess[poi.id] ? '#5dff98' : '#d4af37'}`,
                                    borderRadius: '8px',
                                    cursor: uploading[poi.id] ? 'not-allowed' : 'pointer',
                                    opacity: uploading[poi.id] ? 0.6 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <input
                                    type="file"
                                    accept="image/png"
                                    onChange={(e) => handleUpload(poi.id, e.target.files[0])}
                                    disabled={uploading[poi.id]}
                                    style={{ display: 'none' }}
                                />
                                {uploading[poi.id] ? (
                                    <span style={{ color: '#d4af37' }}>⏳ Upload en cours...</span>
                                ) : uploadSuccess[poi.id] ? (
                                    <span style={{ color: '#5dff98' }}>✅ Upload réussi !</span>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '1.2rem' }}>📤</span>
                                        <span style={{ color: '#d4af37', fontWeight: '600' }}>
                                            Upload Map PNG
                                        </span>
                                    </>
                                )}
                            </label>

                            {uploadSuccess[poi.id] && (
                                <div style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.8rem',
                                    color: '#5dff98',
                                    wordBreak: 'break-all'
                                }}>
                                    URL: {uploadSuccess[poi.id]}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

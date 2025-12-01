import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import AddGameForm from '../../components/AddGameForm/AddGameForm';
import EditGameForm from '../../components/EditGameForm/EditGameForm';
import API_BASE_URL from '../../config';
import './Games.css';

function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState({ show: false, message: '', type: '' });

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/games`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            
            const data = await response.json();
            setGames(data);
            setError(null);
        } catch (err) {
            console.error('Error:', err);
            setError('Unable to load games. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleGameAdded = (newGame) => {
        setGames(prevGames => [newGame, ...prevGames]);
        
        setTimeout(() => {
            const gamesSection = document.querySelector('.featured');
            if (gamesSection) {
                gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleEditClick = (game) => {
        setSelectedGame(game);
        setShowEditForm(true);
    };

    const handleGameUpdated = (updatedGame) => {
        setGames(prevGames => 
            prevGames.map(game => 
                game.id === updatedGame.id ? updatedGame : game
            )
        );
        setShowEditForm(false);
        setSelectedGame(null);
    };

    const handleDeleteClick = async (gameId) => {
        if (!window.confirm('Are you sure you want to delete this game? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/games/${gameId}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (response.ok) {
                setGames(prevGames => prevGames.filter(game => game.id !== gameId));
                setDeleteStatus({
                    show: true,
                    message: 'Game deleted successfully!',
                    type: 'success'
                });
            } else {
                setDeleteStatus({
                    show: true,
                    message: data.error || 'Failed to delete game',
                    type: 'error'
                });
            }
        } catch (error) {
            console.error('Delete error:', error);
            setDeleteStatus({
                show: true,
                message: 'Network error. Please try again.',
                type: 'error'
            });
        }

        setTimeout(() => {
            setDeleteStatus({ show: false, message: '', type: '' });
        }, 3000);
    };

    return (
        <main>
            <Hero 
                title="Games" 
                subtitle="Explore our collection of amazing games" 
            />

            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{
                        padding: '1rem 2rem',
                        background: showAddForm ? '#666' : 'var(--color-highlight)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    {showAddForm ? '✕ Close Form' : '+ Add New Game'}
                </button>
            </div>

            {showAddForm && <AddGameForm onGameAdded={handleGameAdded} />}

            {showEditForm && selectedGame && (
                <EditGameForm 
                    game={selectedGame}
                    onGameUpdated={handleGameUpdated}
                    onClose={() => {
                        setShowEditForm(false);
                        setSelectedGame(null);
                    }}
                />
            )}

            {deleteStatus.show && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '1rem 2rem',
                    background: deleteStatus.type === 'success' 
                        ? 'linear-gradient(135deg, #51cf66 0%, #37b24d 100%)' 
                        : 'linear-gradient(135deg, #ff6b6b 0%, #fa5252 100%)',
                    color: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                    zIndex: 9999,
                    fontWeight: 'bold',
                    animation: 'slideInRight 0.3s ease'
                }}>
                    {deleteStatus.type === 'success' ? '✓ ' : '✕ '}
                    {deleteStatus.message}
                </div>
            )}

            <section className="featured">
                <h2>All Games ({games.length})</h2>
                
                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Loading games...</p>
                    </div>
                )}
                
                {error && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
                        <p>{error}</p>
                    </div>
                )}
                
                {!loading && !error && games.length > 0 && (
                    <div className="products">
                        {games.map((game) => (
                            <div key={game.id} className="product-wrapper">
                                <ProductCard 
                                    id={game.id}
                                    name={game.name}
                                    price={game.price}
                                    image={game.image}
                                    genre={game.genre}
                                    platform={game.platform}
                                    rating={game.rating}
                                />
                                <div className="product-actions">
                                    <button 
                                        className="edit-btn"
                                        onClick={() => handleEditClick(game)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDeleteClick(game.id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && games.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>No games available. Add your first game above!</p>
                    </div>
                )}
            </section>

            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .product-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .product-actions {
                    display: flex;
                    gap: 0.5rem;
                    width: 100%;
                    max-width: 300px;
                }

                .edit-btn,
                .delete-btn {
                    flex: 1;
                    padding: 0.7rem 1rem;
                    border: none;
                    border-radius: 6px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 0.9rem;
                }

                .edit-btn {
                    background: linear-gradient(135deg, #00b4d8 0%, #0091a8 100%);
                    color: white;
                }

                .edit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 180, 216, 0.4);
                }

                .delete-btn {
                    background: linear-gradient(135deg, #ff6b6b 0%, #fa5252 100%);
                    color: white;
                }

                .delete-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
                }
            `}</style>
        </main>
    );
}

export default Games;
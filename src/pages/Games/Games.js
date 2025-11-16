import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import AddGameForm from '../../components/AddGameForm/AddGameForm';
import API_BASE_URL from '../../config';
import './Games.css';

function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

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
        // Add the new game to the beginning of the list
        setGames(prevGames => [newGame, ...prevGames]);
        
        // Scroll to the games list
        setTimeout(() => {
            const gamesSection = document.querySelector('.featured');
            if (gamesSection) {
                gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <main>
            <Hero 
                title="Games" 
                subtitle="Explore our collection of amazing games" 
            />

            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    style={{
                        padding: '1rem 2rem',
                        background: showForm ? '#666' : 'var(--color-highlight)',
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
                    {showForm ? '✕ Close Form' : '+ Add New Game'}
                </button>
            </div>

            {showForm && <AddGameForm onGameAdded={handleGameAdded} />}

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
                            <ProductCard 
                                key={game.id}
                                id={game.id}
                                name={game.name}
                                price={game.price}
                                image={game.image}
                                genre={game.genre}
                                platform={game.platform}
                                rating={game.rating}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Games;
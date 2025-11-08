import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import API_BASE_URL from '../../config';
import './Games.css';

function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <main>
            <Hero 
                title="Games" 
                subtitle="Explore our collection of amazing games" 
            />

            <section className="featured">
                <h2>All Games</h2>
                
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
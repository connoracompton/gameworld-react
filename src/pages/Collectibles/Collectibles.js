import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import API_BASE_URL from '../../config';
import './Collectibles.css';

function Collectibles() {
    const [collectibles, setCollectibles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCollectibles();
    }, []);

    const fetchCollectibles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/collectibles`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch collectibles');
            }
            
            const data = await response.json();
            setCollectibles(data);
            setError(null);
        } catch (err) {
            console.error('Error:', err);
            setError('Unable to load collectibles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Hero 
                title="Collectibles" 
                subtitle="Discover rare and unique gaming items" 
            />

            <section className="featured">
                <h2>All Collectibles</h2>
                
                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Loading collectibles...</p>
                    </div>
                )}
                
                {error && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
                        <p>{error}</p>
                    </div>
                )}
                
                {!loading && !error && collectibles.length > 0 && (
                    <div className="products">
                        {collectibles.map((item) => (
                            <ProductCard 
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Collectibles;
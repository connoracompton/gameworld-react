import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import API_BASE_URL from '../../config';
import './Consoles.css';

function Consoles() {
    const [consoles, setConsoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchConsoles();
    }, []);

    const fetchConsoles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/consoles`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch consoles');
            }
            
            const data = await response.json();
            setConsoles(data);
            setError(null);
        } catch (err) {
            console.error('Error:', err);
            setError('Unable to load consoles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Hero 
                title="Consoles" 
                subtitle="Find your perfect gaming system" 
            />

            <section className="featured">
                <h2>All Consoles</h2>
                
                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Loading consoles...</p>
                    </div>
                )}
                
                {error && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
                        <p>{error}</p>
                    </div>
                )}
                
                {!loading && !error && consoles.length > 0 && (
                    <div className="products">
                        {consoles.map((console) => (
                            <ProductCard 
                                key={console.id}
                                id={console.id}
                                name={console.name}
                                price={console.price}
                                image={console.image}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Consoles;
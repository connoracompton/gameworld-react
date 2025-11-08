import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import Slideshow from '../../components/Slideshow/Slideshow';
import API_BASE_URL from '../../config';
import './Home.css';

function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            setLoading(true);
            
            // Fetch from all three categories
            const [gamesRes, consolesRes, collectiblesRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/games`),
                fetch(`${API_BASE_URL}/api/consoles`),
                fetch(`${API_BASE_URL}/api/collectibles`)
            ]);

            const games = await gamesRes.json();
            const consoles = await consolesRes.json();
            const collectibles = await collectiblesRes.json();

            // Select featured items (first 2 from each category)
            const featured = [
                ...games.slice(0, 2),
                ...consoles.slice(0, 2),
                ...collectibles.slice(0, 2)
            ];

            setFeaturedProducts(featured);
        } catch (err) {
            console.error('Error fetching featured products:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Hero 
                title="Welcome to GameWorld" 
                subtitle="Your ultimate destination for games, consoles, and collectibles" 
            />

            <Slideshow />

            <section className="reviews-preview">
                <div className="reviews-preview-card">
                    <h2>What Gamers Are Saying</h2>
                    <p>Check out honest reviews from our gaming community on the latest titles, consoles, and collectibles.</p>
                    <Link to="/reviews">
                        <button className="category-btn">Read Reviews</button>
                    </Link>
                </div>
            </section>

            <section className="categories">
                <CategoryCard 
                    icon="🎮"
                    title="Games"
                    description="Latest releases and classic titles"
                    link="/games"
                />
                <CategoryCard 
                    icon="🕹️"
                    title="Consoles"
                    description="Gaming systems and accessories"
                    link="/consoles"
                />
                <CategoryCard 
                    icon="⭐"
                    title="Collectibles"
                    description="Acquire rare items and memorabilia"
                    link="/collectibles"
                />
            </section>

            <section className="featured">
                <h2>Featured Products</h2>
                
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Loading featured products...</p>
                    </div>
                ) : (
                    <div className="products">
                        {featuredProducts.map((product) => (
                            <ProductCard 
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                genre={product.genre}
                                platform={product.platform}
                                rating={product.rating}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className="project-links">
                <h3>Project Links</h3>
                <div className="links-container">
                    <a 
                        href="https://connoracompton.github.io/gameworld-react/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        🌐 Live Site
                    </a>
                    <a 
                        href="https://github.com/connoracompton/gameworld-react" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        📂 Client Code Repository
                    </a>
                    <a 
                        href="https://gameworld-server.onrender.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        🔌 API Server
                    </a>
                    <a 
                        href="https://github.com/connoracompton/gameworld-server" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                    >
                        📂 Server Code Repository
                    </a>
                </div>
            </section>
        </main>
    );
}

export default Home;
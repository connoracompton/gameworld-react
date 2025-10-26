import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/hero';
import CategoryCard from '../../components/CategoryCard/categorycard';
import ProductCard from '../../components/ProductCard/productcard';
import './home.css';

function Home() {
    const featuredProducts = [
        {
            id: 'mystic-realms',
            name: 'Mystic Realms',
            price: '49.99',
            image: require('../../images/mystic-realms.png')
        },
        {
            id: 'next-gen',
            name: 'Next-Gen Gaming Console',
            price: '499.99',
            image: require('../../images/next-gen.jpg')
        },
        {
            id: 'limited-figure',
            name: 'Limited Edition Figure',
            price: '89.99',
            image: require('../../images/limited-edition-figurine.png')
        },
        {
            id: 'pixel-quest',
            name: 'Pixel Quest',
            price: '49.99',
            image: require('../../images/pixel-quest.png')
        },
        {
            id: 'controller',
            name: 'Wireless Controller',
            price: '69.99',
            image: require('../../images/controller.jpg')
        },
        {
            id: 'poster',
            name: 'Vintage Gaming Poster',
            price: '19.99',
            image: require('../../images/vintage-gaming-poster.png')
        }
    ];

    return (
        <main>
            <Hero 
                title="Welcome to GameWorld" 
                subtitle="Your ultimate destination for games, consoles, and collectibles" 
            />

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
                <div className="products">
                    {featuredProducts.map((product) => (
                        <ProductCard 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
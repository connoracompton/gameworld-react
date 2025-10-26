import React from 'react';
import Hero from '../../components/Hero/hero';
import ProductCard from '../../components/ProductCard/productcard';
import './Games.css';

function Games() {
    // Hardcoded games data (will be dynamic later with JSON)
    const games = [
        {
            id: 'mystic-realms',
            name: 'Mystic Realms',
            price: '49.99',
            genre: 'RPG',
            platform: 'PS5, Xbox, PC',
            rating: 'E10+',
            image: require('../../images/mystic-realms.png')
        },
        {
            id: 'arcade-legends',
            name: 'Arcade Legends',
            price: '29.99',
            genre: 'Arcade',
            platform: 'Switch, PC',
            rating: 'E',
            image: require('../../images/arcade-legends.png')
        },
        {
            id: 'steel-vanguard',
            name: 'Steel Vanguard',
            price: '59.99',
            genre: 'Action',
            platform: 'PS5, Xbox, PC',
            rating: 'M',
            image: require('../../images/steel-vanguard.png')
        },
        {
            id: 'lost-horizon',
            name: 'Lost Horizon',
            price: '49.99',
            genre: 'Adventure',
            platform: 'PS5, PC',
            rating: 'T',
            image: require('../../images/lost-horizon.png')
        },
        {
            id: 'pixel-quest',
            name: 'Pixel Quest',
            price: '29.99',
            genre: 'Platformer',
            platform: 'All Platforms',
            rating: 'E',
            image: require('../../images/pixel-quest.png')
        },
        {
            id: 'shadow-strike',
            name: 'Shadow Strike',
            price: '59.99',
            genre: 'Stealth',
            platform: 'PS5, Xbox, PC',
            rating: 'M',
            image: require('../../images/shadow-strike.png')
        }
    ];

    return (
        <main>
            <Hero 
                title="Games" 
                subtitle="Explore our collection of amazing games" 
            />

            <section className="featured">
                <h2>All Games</h2>
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
            </section>
        </main>
    );
}

export default Games;
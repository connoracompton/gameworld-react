import React from 'react';
import Hero from '../../components/Hero/hero';
import ProductCard from '../../components/ProductCard/productcard';
import './Collectibles.css';

function Collectibles() {
    const collectibles = [
        {
            id: 'limited-figure',
            name: 'Limited Edition Figure',
            price: '89.99',
            image: require('../../images/limited-edition-figurine.png')
        },
        {
            id: 'poster',
            name: 'Vintage Gaming Poster',
            price: '19.99',
            image: require('../../images/vintage-gaming-poster.png')
        },
        {
            id: 'rare-cartridge',
            name: 'Rare Game Cartridge',
            price: '149.99',
            image: require('../../images/rare-game-cartridge.png')
        }
    ];

    return (
        <main>
            <Hero 
                title="Collectibles" 
                subtitle="Discover rare and unique gaming items" 
            />

            <section className="featured">
                <h2>All Collectibles</h2>
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
            </section>
        </main>
    );
}

export default Collectibles;
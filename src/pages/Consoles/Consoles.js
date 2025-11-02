import React from 'react';
import Hero from '../../components/Hero/Hero';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Consoles.css';

function Consoles() {
    const consoles = [
        {
            id: 'next-gen',
            name: 'Next-Gen Console',
            price: '499.99',
            image: require('../../images/next-gen.jpg')
        },
        {
            id: 'wii',
            name: 'Wii',
            price: '199.99',
            image: require('../../images/wii.jpg')
        },
        {
            id: 'switch',
            name: 'Switch',
            price: '199.99',
            image: require('../../images/switch.jpg')
        }
    ];

    return (
        <main>
            <Hero 
                title="Consoles" 
                subtitle="Find your perfect gaming system" 
            />

            <section className="featured">
                <h2>All Consoles</h2>
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
            </section>
        </main>
    );
}

export default Consoles;
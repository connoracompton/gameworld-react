import React from 'react';
import './Hero.css';

function Hero({ title, subtitle }) {
    return (
        <section className="hero">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </section>
    );
}

export default Hero;
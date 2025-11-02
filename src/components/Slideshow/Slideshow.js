import React, { useState, useEffect } from 'react';
import './Slideshow.css';

function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            title: "New Releases",
            description: "Check out the hottest games of 2025",
            color: "#00b4d8"
        },
        {
            title: "Console Deals",
            description: "Save big on next-gen systems",
            color: "#ff6b6b"
        },
        {
            title: "Collector's Corner",
            description: "Rare finds and limited editions",
            color: "#51cf66"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="slideshow-container">
            <div 
                className="slide"
                style={{ background: slides[currentSlide].color }}
            >
                <h2>{slides[currentSlide].title}</h2>
                <p>{slides[currentSlide].description}</p>
            </div>
            <div className="slide-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={index === currentSlide ? 'active' : ''}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slideshow;
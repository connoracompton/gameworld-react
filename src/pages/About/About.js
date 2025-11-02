import React from 'react';
import Hero from '../../components/Hero/Hero';
import './About.css';

function About() {
    return (
        <main>
            <Hero 
                title="About GameWorld" 
                subtitle="We are your one-stop shop for games, consoles, and collectibles." 
            />

            <section className="about-content">
                <h3>Our Story</h3>
                <p>Founded in 2020, GameWorld began as a passion project by a group of dedicated gamers who wanted to create the ultimate destination for gaming enthusiasts. What started as a small online store has grown into a comprehensive gaming marketplace serving thousands of customers worldwide.</p>

                <h3>Our Mission</h3>
                <p>At GameWorld, we believe that gaming brings people together and creates lasting memories. Our mission is to provide gamers of all ages with access to the latest games, cutting-edge consoles, and unique collectibles that celebrate gaming culture. We're committed to offering competitive prices, exceptional customer service, and a seamless shopping experience.</p>

                <h3>What We Offer</h3>
                <p><strong>Games:</strong> From the hottest new releases to beloved retro classics, we stock thousands of titles across all platforms and genres.</p>
                <p><strong>Consoles:</strong> Whether you're looking for the latest next-gen system or a vintage console for nostalgia, we have you covered with both new and refurbished options.</p>
                <p><strong>Collectibles:</strong> Rare figurines, limited edition items, vintage posters, and unique gaming memorabilia that every collector dreams of finding.</p>

                <h3>Why Choose GameWorld?</h3>
                <p>• <strong>Curated Selection:</strong> Every item in our store is carefully selected for quality and authenticity</p>
                <p>• <strong>Competitive Pricing:</strong> We work hard to offer the best prices in the market</p>
                <p>• <strong>Expert Support:</strong> Our team consists of passionate gamers who understand your needs</p>
                <p>• <strong>Fast Shipping:</strong> Quick and secure delivery to get your games to you as soon as possible</p>
                <p>• <strong>Community Focus:</strong> We're not just a store - we're part of the gaming community</p>

                <h3>Our Team</h3>
                <div className="team-grid">
                    <div className="team-member">
                        <h4>Alex Rodriguez</h4>
                        <p><strong>Founder & CEO</strong></p>
                        <p>Lifelong gamer with 15+ years in the industry. Specializes in retro gaming and rare collectibles.</p>
                    </div>
                    <div className="team-member">
                        <h4>Sarah Chen</h4>
                        <p><strong>Head of Operations</strong></p>
                        <p>Console expert and logistics wizard. Ensures every order gets processed quickly and accurately.</p>
                    </div>
                    <div className="team-member">
                        <h4>Mike Johnson</h4>
                        <p><strong>Gaming Specialist</strong></p>
                        <p>Our go-to guy for the latest releases and gaming trends. Always knows what's hot and what's coming next.</p>
                    </div>
                </div>

                <h3>Contact Us</h3>
                <p>Have questions or need assistance? We're here to help! Reach out to us through our contact page or email us directly at support@gameworld.com. Follow us on social media for the latest updates, gaming news, and exclusive deals.</p>

                <p><strong>Join the GameWorld community today and level up your gaming experience!</strong></p>
            </section>
        </main>
    );
}

export default About;
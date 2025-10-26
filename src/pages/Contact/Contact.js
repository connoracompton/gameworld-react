import React from 'react';
import Hero from '../../components/Hero/hero';
import './Contact.css';

function Contact() {
    return (
        <main>
            <Hero 
                title="Contact Us" 
                subtitle="We'd love to hear from you!" 
            />

            <div className="contact-wrapper">
                {/* CONTACT FORM */}
                <div className="form-section">
                    <h3>Send Us a Message</h3>
                    <form id="contactForm">
                        <label>Name *</label>
                        <input type="text" id="name" required />
                        
                        <label>Email *</label>
                        <input type="email" id="email" required />
                        
                        <label>Message *</label>
                        <textarea id="message" required></textarea>
                        
                        <button type="submit">Send</button>
                    </form>
                    
                    <div id="successMsg" style={{display: 'none'}}>✓ Message sent successfully!</div>
                    <div id="errorMsg" style={{display: 'none'}}>✕ Please fill all fields correctly.</div>
                </div>

                {/* IFRAME */}
                <div className="map-section">
                    <h3>Find Us</h3>
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        allowFullScreen
                        title="GameWorld Video"
                    ></iframe>
                </div>
            </div>
        </main>
    );
}

export default Contact;
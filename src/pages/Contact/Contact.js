import React, { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            setShowError(true);
            setShowSuccess(false);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setShowError(true);
            setShowSuccess(false);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        // Success - in a real app, you'd send to a backend here
        console.log('Form submitted:', formData);
        setShowSuccess(true);
        setShowError(false);
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
    };

    return (
        <main>
            <Hero 
                title="Contact Us" 
                subtitle="We'd love to hear from you!" 
            />

            <div className="contact-wrapper">
                <div className="form-section">
                    <h3>Send Us a Message</h3>
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <label>Name *</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                        
                        <label>Email *</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                        
                        <label>Message *</label>
                        <textarea 
                            id="message" 
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        
                        <button type="submit">Send</button>
                    </form>
                    
                    {showSuccess && (
                        <div id="successMsg">✓ Message sent successfully!</div>
                    )}
                    {showError && (
                        <div id="errorMsg">✕ Please fill all fields correctly.</div>
                    )}
                </div>

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
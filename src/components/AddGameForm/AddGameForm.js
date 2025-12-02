import React, { useState } from 'react';
import API_BASE_URL from '../../config';
import './AddGameForm.css';

function AddGameForm({ onGameAdded }) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        genre: '',
        platform: '',
        rating: 'E',
        image: '',
        description: ''
    });
    
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // ID validation
        if (!formData.id.trim()) {
            newErrors.id = 'ID is required';
        } else if (!/^[a-z0-9-]+$/.test(formData.id)) {
            newErrors.id = 'ID must contain only lowercase letters, numbers, and hyphens';
        }

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2 || formData.name.length > 100) {
            newErrors.name = 'Name must be between 2 and 100 characters';
        }

        // Price validation
        if (!formData.price) {
            newErrors.price = 'Price is required';
        } else if (isNaN(formData.price) || parseFloat(formData.price) < 0 || parseFloat(formData.price) > 999.99) {
            newErrors.price = 'Price must be between $0.00 and $999.99';
        }

        // Genre validation
        if (!formData.genre.trim()) {
            newErrors.genre = 'Genre is required';
        } else if (formData.genre.length < 2 || formData.genre.length > 50) {
            newErrors.genre = 'Genre must be between 2 and 50 characters';
        }

        // Platform validation
        if (!formData.platform.trim()) {
            newErrors.platform = 'Platform is required';
        } else if (formData.platform.length < 2 || formData.platform.length > 100) {
            newErrors.platform = 'Platform must be between 2 and 100 characters';
        }

        // Rating validation
        if (!['E', 'E10+', 'T', 'M', 'AO'].includes(formData.rating)) {
            newErrors.rating = 'Please select a valid rating';
        }

        // Image validation
        if (!formData.image.trim()) {
            newErrors.image = 'Image URL is required';
        } else {
            try {
                new URL(formData.image);
            } catch {
                newErrors.image = 'Please enter a valid URL';
            }
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 10 || formData.description.length > 500) {
            newErrors.description = 'Description must be between 10 and 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setSubmitStatus({ 
                type: 'error', 
                message: 'Please fix the errors above before submitting' 
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            console.log('Posting to:', `${API_BASE_URL}/api/games`);
    
            const response = await fetch(`${API_BASE_URL}/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price)
                })
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error('Server returned non-JSON response');
            }

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ 
                    type: 'success', 
                    message: 'Game added successfully!' 
                });
                
                // Reset form
                setFormData({
                    id: '',
                    name: '',
                    price: '',
                    genre: '',
                    platform: '',
                    rating: 'E',
                    image: '',
                    description: ''
                });
                
                // Notify parent component
                if (onGameAdded) {
                    onGameAdded(data.data);
                }
            } else {
                setSubmitStatus({ 
                    type: 'error', 
                    message: data.error || 'Failed to add game' 
                });
            }
        } catch (error) {
            setSubmitStatus({ 
                type: 'error', 
                message: 'Network error. Please try again.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-game-form-container">
            <h2>Add New Game</h2>
            <form onSubmit={handleSubmit} className="add-game-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="id">Game ID *</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="e.g., my-awesome-game"
                            className={errors.id ? 'error' : ''}
                        />
                        {errors.id && <span className="error-message">{errors.id}</span>}
                        <small>Use lowercase letters, numbers, and hyphens only</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Game Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., My Awesome Game"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price ($) *</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="49.99"
                            step="0.01"
                            min="0"
                            max="999.99"
                            className={errors.price ? 'error' : ''}
                        />
                        {errors.price && <span className="error-message">{errors.price}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre *</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            placeholder="e.g., RPG, Action, Adventure"
                            className={errors.genre ? 'error' : ''}
                        />
                        {errors.genre && <span className="error-message">{errors.genre}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="platform">Platform *</label>
                        <input
                            type="text"
                            id="platform"
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                            placeholder="e.g., PS5, Xbox, PC"
                            className={errors.platform ? 'error' : ''}
                        />
                        {errors.platform && <span className="error-message">{errors.platform}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">Rating *</label>
                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className={errors.rating ? 'error' : ''}
                        >
                            <option value="E">E - Everyone</option>
                            <option value="E10+">E10+ - Everyone 10+</option>
                            <option value="T">T - Teen</option>
                            <option value="M">M - Mature</option>
                            <option value="AO">AO - Adults Only</option>
                        </select>
                        {errors.rating && <span className="error-message">{errors.rating}</span>}
                    </div>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="image">Image URL *</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className={errors.image ? 'error' : ''}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>

                <div className="form-group full-width">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter a detailed description of the game (10-500 characters)"
                        rows="4"
                        className={errors.description ? 'error' : ''}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                    <small>{formData.description.length}/500 characters</small>
                </div>

                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding Game...' : 'Add Game'}
                </button>

                {submitStatus.message && (
                    <div className={`submit-status ${submitStatus.type}`}>
                        {submitStatus.message}
                    </div>
                )}
            </form>
        </div>
    );
}

export default AddGameForm;
import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config';
import './EditGameForm.css';

function EditGameForm({ game, onGameUpdated, onClose }) {
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

    useEffect(() => {
        if (game) {
            setFormData({
                id: game.id,
                name: game.name,
                price: game.price.toString(),
                genre: game.genre,
                platform: game.platform,
                rating: game.rating,
                image: game.image,
                description: game.description || ''
            });
        }
    }, [game]);

    const validateForm = () => {
        const newErrors = {};

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
            const response = await fetch(`${API_BASE_URL}/api/games/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseFloat(formData.price),
                    genre: formData.genre,
                    platform: formData.platform,
                    rating: formData.rating,
                    image: formData.image,
                    description: formData.description
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ 
                    type: 'success', 
                    message: 'Game updated successfully!' 
                });
                
                // Notify parent component with updated game data
                if (onGameUpdated) {
                    onGameUpdated(data.data);
                }

                // Close modal after short delay
                setTimeout(() => {
                    onClose();
                }, 1500);
            } else {
                setSubmitStatus({ 
                    type: 'error', 
                    message: data.error || 'Failed to update game' 
                });
            }
        } catch (error) {
            console.error('Update error:', error);
            setSubmitStatus({ 
                type: 'error', 
                message: 'Network error. Please try again.' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="edit-game-form-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2>Edit Game</h2>
                <form onSubmit={handleSubmit} className="edit-game-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="id">Game ID</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                disabled
                                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                            />
                            <small>ID cannot be changed</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Game Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
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
                            rows="4"
                            className={errors.description ? 'error' : ''}
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                        <small>{formData.description.length}/500 characters</small>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Game'}
                        </button>
                    </div>

                    {submitStatus.message && (
                        <div className={`submit-status ${submitStatus.type}`}>
                            {submitStatus.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default EditGameForm;
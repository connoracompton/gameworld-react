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
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

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
        if (!formData.image.trim() && !selectedFile) {
            newErrors.image = 'Image URL or file upload is required';
        } else if (formData.image.trim()) {
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
                }));
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({
                    ...prev,
                    image: 'Image file size must be less than 5MB'
                }));
                return;
            }

            setSelectedFile(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);

            // Clear image URL if file is selected
            setFormData(prev => ({
                ...prev,
                image: ''
            }));

            // Clear errors
            if (errors.image) {
                setErrors(prev => ({
                    ...prev,
                    image: ''
                }));
            }
        }
    };

    const uploadImage = async () => {
        if (!selectedFile) return formData.image;

        setUploadingImage(true);
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);

        try {
            const response = await fetch(`${API_BASE_URL}/api/upload`, {
                method: 'POST',
                body: imageFormData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                return data.imageUrl;
            } else {
                throw new Error(data.error || 'Failed to upload image');
            }
        } catch (error) {
            throw new Error(`Image upload failed: ${error.message}`);
        } finally {
            setUploadingImage(false);
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
            // Upload image if file is selected
            let imageUrl = formData.image;
            if (selectedFile) {
                imageUrl = await uploadImage();
            }

            const response = await fetch(`${API_BASE_URL}/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    image: imageUrl
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
                setSelectedFile(null);
                setPreviewUrl('');
                
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
                message: error.message || 'Network error. Please try again.' 
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
                    <label htmlFor="image">Image *</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className={errors.image ? 'error' : ''}
                        disabled={selectedFile !== null}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                    <small>Enter image URL or upload a file below</small>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="imageFile">Or Upload Image File</label>
                    <input
                        type="file"
                        id="imageFile"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleFileChange}
                        disabled={formData.image.trim() !== ''}
                    />
                    <small>Max file size: 5MB. Allowed formats: JPEG, PNG, GIF, WebP</small>
                    {previewUrl && (
                        <div className="image-preview">
                            <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px' }} />
                            <button 
                                type="button" 
                                onClick={() => {
                                    setSelectedFile(null);
                                    setPreviewUrl('');
                                }}
                                style={{ display: 'block', marginTop: '10px', padding: '5px 10px', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Remove Image
                            </button>
                        </div>
                    )}
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
                    disabled={isSubmitting || uploadingImage}
                >
                    {uploadingImage ? 'Uploading Image...' : isSubmitting ? 'Adding Game...' : 'Add Game'}
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
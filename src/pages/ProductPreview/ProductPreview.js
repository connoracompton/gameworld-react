import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';
import './ProductPreview.css';

function ProductPreview() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            
            // Try to fetch from games first
            let response = await fetch(`${API_BASE_URL}/api/games/${productId}`);
            let data;
            
            if (response.ok) {
                data = await response.json();
                data.category = 'game';
            } else {
                // Try consoles
                response = await fetch(`${API_BASE_URL}/api/consoles/${productId}`);
                if (response.ok) {
                    data = await response.json();
                    data.category = 'console';
                } else {
                    // Try collectibles
                    response = await fetch(`${API_BASE_URL}/api/collectibles/${productId}`);
                    if (response.ok) {
                        data = await response.json();
                        data.category = 'collectible';
                    } else {
                        throw new Error('Product not found');
                    }
                }
            }
            
            setProduct(data);
            setError(null);
        } catch (err) {
            console.error('Error:', err);
            setError('Product not found');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1); // Go back to previous page
    };

    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <p>Loading product...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="modal-overlay" onClick={handleClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={handleClose}>✕</button>
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b6b' }}>
                        <p>{error || 'Product not found'}</p>
                        <button 
                            onClick={handleClose}
                            style={{
                                marginTop: '1rem',
                                padding: '0.8rem 1.5rem',
                                background: 'var(--color-highlight)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>✕</button>
                
                <div className="product-details">
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-info">
                        <h2>{product.name}</h2>
                        
                        <p className="product-description">
                            {product.description}
                        </p>

                        <div className="product-specs">
                            {product.genre && <p><strong>Genre:</strong> {product.genre}</p>}
                            {product.platform && <p><strong>Platform:</strong> {product.platform}</p>}
                            {product.rating && <p><strong>Rating:</strong> {product.rating}</p>}
                            {product.manufacturer && <p><strong>Manufacturer:</strong> {product.manufacturer}</p>}
                            {product.release_year && <p><strong>Release Year:</strong> {product.release_year}</p>}
                            {product.rarity && <p><strong>Rarity:</strong> {product.rarity}</p>}
                            {product.height && <p><strong>Height:</strong> {product.height}</p>}
                            {product.size && <p><strong>Size:</strong> {product.size}</p>}
                            {product.condition && <p><strong>Condition:</strong> {product.condition}</p>}
                        </div>

                        <p className="product-price">${product.price}</p>

                        <button className="add-cart-btn">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPreview;
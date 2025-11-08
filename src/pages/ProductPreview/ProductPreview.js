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
            
            // Try each category
            const categories = ['games', 'consoles', 'collectibles'];
            let found = null;
            
            for (const category of categories) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/${category}/${productId}`);
                    if (response.ok) {
                        found = await response.json();
                        break;
                    }
                } catch (err) {
                    continue;
                }
            }
            
            if (found) {
                setProduct(found);
                setError(null);
            } else {
                setError('Product not found');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Unable to load product');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <main>
                <div className="modal-overlay" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleClose}>×</button>
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <p>Loading...</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main>
                <div className="modal-overlay" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleClose}>×</button>
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#ff6b6b' }}>
                            <h2>Product Not Found</h2>
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="modal-overlay" onClick={handleClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={handleClose}>×</button>
                    
                    <div className="product-details">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            
                            {product.genre && (
                                <div className="product-specs">
                                    <p><strong>Genre:</strong> {product.genre}</p>
                                    <p><strong>Platform:</strong> {product.platform}</p>
                                    <p><strong>Rating:</strong> {product.rating}</p>
                                </div>
                            )}
                            
                            {product.manufacturer && (
                                <div className="product-specs">
                                    <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
                                    <p><strong>Release Year:</strong> {product.release_year}</p>
                                </div>
                            )}
                            
                            {product.rarity && (
                                <div className="product-specs">
                                    <p><strong>Rarity:</strong> {product.rarity}</p>
                                    {product.height && <p><strong>Height:</strong> {product.height}</p>}
                                    {product.size && <p><strong>Size:</strong> {product.size}</p>}
                                </div>
                            )}
                            
                            <p className="product-price">${product.price}</p>
                            
                            <button className="add-cart-btn" onClick={() => alert('Added to cart!')}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductPreview;
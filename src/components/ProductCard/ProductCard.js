import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ id, name, price, image, genre, platform, rating }) {
    return (
        <div className="product-card">
            <div className="img">
                <Link to={`/product/${id}`}>
                    <img src={image} alt={name} />
                </Link>
            </div>
            <h3>
                <Link to={`/product/${id}`}>{name}</Link>
            </h3>
            <p className="price">${price}</p>
            {genre && platform && rating && (
                <div className="product-details">
                    <p><strong>Genre:</strong> {genre}</p>
                    <p><strong>Platform:</strong> {platform}</p>
                    <p><strong>Rating:</strong> {rating}</p>
                </div>
            )}
            <button className="add-to-cart" data-name={name} data-price={price}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;
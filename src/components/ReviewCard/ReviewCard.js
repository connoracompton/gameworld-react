import React from 'react';
import './ReviewCard.css';

function ReviewCard({ name, image, rating, review, author }) {
    return (
        <div className="product-card review-card">
            <div className="img">
                <img src={image} alt={name} />
            </div>
            <h3>{name}</h3>
            <p className="rating">{rating}</p>
            <p className="review-text">"{review}"</p>
            <p className="author"><em>- {author}</em></p>
        </div>
    );
}

export default ReviewCard;
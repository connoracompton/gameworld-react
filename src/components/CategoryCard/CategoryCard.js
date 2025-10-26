import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

function CategoryCard({ icon, title, description, link }) {
    return (
        <div className="category">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link to={link}>
                <button className="category-btn">Browse {title}</button>
            </Link>
        </div>
    );
}

export default CategoryCard;
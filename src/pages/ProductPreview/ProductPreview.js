import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductPreview.css';

function ProductPreview() {
    const { productId } = useParams();

    // Sample product data (will be dynamic later)
    const productData = {
        'mystic-realms': {
            name: 'Mystic Realms',
            price: '49.99',
            image: require('../../images/mystic-realms.png'),
            description: 'Step into the enchanted world of Mystic Realms, where mystery, and adventure collide. Explore vast kingdoms filled with mythical creatures, hidden treasures, and powerful spells waiting to be mastered.'
        },
        'next-gen': {
            name: 'Next-Gen Console',
            price: '499.99',
            image: require('../../images/next-gen.jpg'),
            description: 'Experience the future of gaming with the Next Gen Console, built for lightning-fast performance, stunning 4K visuals, and ultra-smooth gameplay.'
        },
        'limited-figure': {
            name: 'Limited Edition Figure',
            price: '89.99',
            image: require('../../images/limited-edition-figurine.png'),
            description: 'Own a piece of gaming history with the Limited Edition Figurine, crafted with premium detail and made exclusively for true collectors.'
        },
        'pixel-quest': {
            name: 'Pixel Quest',
            price: '29.99',
            image: require('../../images/pixel-quest.png'),
            description: 'Dive into the retro-inspired adventure of Pixel Quest, a fast-paced platformer bursting with charm and challenge.'
        },
        'controller': {
            name: 'Wireless Controller',
            price: '69.99',
            image: require('../../images/controller.jpg'),
            description: 'Elevate your gameplay with the Pro Gamer Controller, designed for precision, comfort, and lightning-fast response.'
        },
        'poster': {
            name: 'Vintage Gaming Poster',
            price: '19.99',
            image: require('../../images/vintage-gaming-poster.png'),
            description: 'Bring the golden age of gaming to your walls with the Vintage Gaming Poster, a high-quality print that captures the bold colors and iconic style of classic arcades.'
        }
    };

    const product = productData[productId] || {
        name: 'Product Not Found',
        price: '0.00',
        image: '',
        description: 'This product does not exist.'
    };

    return (
        <main>
            <section className="featured">
                <h2>{product.name}</h2>
                <div className="product-preview-container">
                    <div className="preview-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="preview-details">
                        <p className="preview-description">{product.description}</p>
                        <p className="preview-price"><strong>${product.price}</strong></p>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProductPreview;
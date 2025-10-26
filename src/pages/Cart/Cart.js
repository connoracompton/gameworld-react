import React from 'react';
import Hero from '../../components/Hero/hero';
import './Cart.css';

function Cart() {
    return (
        <main>
            <Hero 
                title="Your Cart" 
                subtitle="Review your items before checkout" 
            />

            <section className="featured">
                <div className="cart-container">
                    <p className="cart-empty">Your cart is empty</p>
                    <div className="cart-actions">
                        <a href="/">
                            <button className="continue-shopping">Continue Shopping</button>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Cart;
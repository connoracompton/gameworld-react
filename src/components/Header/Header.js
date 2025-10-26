import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <h1 className="logo">GAMEWORLD</h1>

            <button className="hamburger" onClick={toggleMenu}>
                ☰
            </button>

            <nav className={isMenuOpen ? 'active' : ''}>
                <ul>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/games" onClick={closeMenu}>Games</Link></li>
                    <li><Link to="/consoles" onClick={closeMenu}>Consoles</Link></li>
                    <li><Link to="/collectibles" onClick={closeMenu}>Collectibles</Link></li>
                    <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>
            </nav>
            
            <div className={`header-right ${isMenuOpen ? 'active' : ''}`}>
                <input type="text" placeholder="Search..." />
                <Link to="/account">Account</Link>
                <Link to="/cart" className="cart-icon">
                    🛒 (<span id="cart-count">0</span>) $<span id="cart-total">0.00</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
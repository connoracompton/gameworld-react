import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <p>© 2025 GameWorld. All rights reserved.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <a 
                    href="https://github.com/connoracompton/gameworld-react" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-highlight)', marginRight: '1rem' }}
                >
                    GitHub Repo
                </a>
                <a 
                    href="https://connoracompton.github.io/gameworld-react" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-highlight)' }}
                >
                    Live Site
                </a>
            </p>
        </footer>
    );
}

export default Footer;
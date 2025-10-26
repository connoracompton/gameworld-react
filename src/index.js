import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './app.css';
import reportWebVitals from './reportWebVitals';

// Import Layout Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Pages
import Home from './pages/Home/Home';
import Games from './pages/Games/Games';
import Consoles from './pages/Consoles/Consoles';
import Collectibles from './pages/Collectibles/Collectibles';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Cart from './pages/Cart/Cart';
import Reviews from './pages/Reviews/Reviews';
import ProductPreview from './pages/ProductPreview/ProductPreview';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/consoles" element={<Consoles />} />
          <Route path="/collectibles" element={<Collectibles />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/product/:productId" element={<ProductPreview />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
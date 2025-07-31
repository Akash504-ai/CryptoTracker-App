import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <h2 className="footer-logo">CryptoTracker</h2>
        <p className="footer-text">© {new Date().getFullYear()} CryptoTracker. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/Akash504-ai/CryptoTracker-App" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">CoinGecko API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

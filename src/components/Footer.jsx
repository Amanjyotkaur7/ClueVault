import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Made with 🔐 by Amanjyot</p>
      <div className="links">
        <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a> | 
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <small>“Encryption never looked this cool.”</small>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1>ClueVault 🔐</h1>
      <p>Deploy time-locked one-time secret payloads</p>
      <a href="#vault" className="enter-btn">Enter Vault</a>
    </section>
  );
};

export default HeroSection;

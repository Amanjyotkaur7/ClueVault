import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-landing">
      <Navbar />

      {/* 🔮 Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1>ClueVault 🔐</h1>
          <p>Deploy time-locked one-time secret messages like a secret agent.</p>
          <button onClick={() => navigate('/vault')}>Enter Vault</button>
        </div>
      </section>

      {/* ✨ About Vault Section */}
      <section className="parallax-section vault">
        <div className="parallax-content">
          <h2>🛰 Secret Message Vault</h2>
          <p>
            ClueVault lets you send one-time messages that can only be unlocked after a specific time. 
            Choose when it unlocks, when it expires, and it will self-destruct like a spy payload.
            <br/><br/>
            Secure. Untraceable. One shot only.
          </p>
          <button onClick={() => navigate('/vault')}>Launch Vault</button>
        </div>
      </section>

      {/* 🔍 Dashboard Section */}
      <section className="parallax-section dashboard">
        <div className="parallax-content">
          <h2>📜 Agent Dashboard</h2>
          <p>
            View your entire drop history. Know when it was opened. 
            Track every mission you've ever launched from your private control panel.
            <br/><br/>
            Simple, fast, and encrypted.
          </p>
          <button onClick={() => navigate('/dashboard')}>View Dashboard</button>
        </div>
      </section>

      {/* 🕵️ Confession Zone */}
      <section className="parallax-section confess">
        <div className="parallax-content">
          <h2>🕵️ Zone Confessions</h2>
          <p>
            Enter an anonymous zone where agents nearby can confess, compliment, or joke — anonymously.
            Public. Fun. Unfiltered. Make your cafeteria a confession booth.
            <br/><br/>
            Drop your anonymous thoughts now.
          </p>
          <button onClick={() => navigate('/confessions')}>Join Confession Zone</button>
        </div>
      </section>

      {/* 🎯 Final CTA */}
      <section className="parallax-section cta">
        <div className="parallax-content">
          <h2>⚡ Ready to Become an Agent?</h2>
          <p>Start using ClueVault and send your first time-locked payload now.</p>
          <button onClick={() => navigate('/login')}>Login Now</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

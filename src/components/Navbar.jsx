// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login'); // redirect to login after logout
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">🔐 ClueVault</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/VaultCard">Vault</Link></li>
        <li><Link to="/Zone">Dropzone</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn" style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

// src/pages/ZoneConfession.jsx
import React, { useState, useEffect } from 'react';
import '../styles/ZoneConfession.css';
import Navbar from './Navbar';

const zones = ['Canteen', 'Library', 'Block A', 'Main Gate', 'Auditorium'];

const ZoneConfession = () => {
  const [zone, setZone] = useState('Canteen');
  const [message, setMessage] = useState('');
  const [confessions, setConfessions] = useState([]);

  const fetchMessages = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/zone-message/${zone}`);
    const data = await res.json();

    if (Array.isArray(data)) {
      setConfessions(data);
    } else {
      console.error('API did not return an array:', data);
      setConfessions([]); // fallback to empty array
    }
  } catch (err) {
    console.error('Error fetching confessions:', err);
    setConfessions([]); // handle network error fallback
  }
};


  useEffect(() => {
    fetchMessages();
  }, [zone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await fetch('http://localhost:5000/api/zone-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone, content: message }),
      });

      setMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Error posting confession:', err);
    }
  };

  return (
   <div>
   <Navbar/>
    <div className="zone-wrapper">
      
      <h2>🧿 Zone Confessions</h2>
      <p className="zone-sub">Drop anonymous fun notes in public areas</p>

      <form className="zone-form" onSubmit={handleSubmit}>
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          {zones.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>

        <textarea
          rows="3"
          placeholder="Confess something anonymously..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">🚀 Drop Message</button>
      </form>

      <div className="zone-feed">
        {confessions.length === 0 ? (
          <p className="empty-state">No messages in this zone yet.</p>
        ) : (
          confessions.map((msg) => (
            <div key={msg._id} className="zone-message-card">
              <p>{msg.content}</p>
              <span className="msg-meta">
                📍 {msg.zone} · {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default ZoneConfession;

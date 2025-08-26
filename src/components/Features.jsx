import React from 'react';
import './Features.css';

const features = [
  { icon: "💣", title: "Self-Destruct", desc: "Messages disappear after viewing" },
  { icon: "⏱️", title: "Time-Lock", desc: "Visible only after unlock time" },
  { icon: "📩", title: "QR + Email", desc: "Send secure links via QR/Email" },
  { icon: "🧾", title: "History Vault", desc: "Track all sent secrets" }
];

const Features = () => {
  return (
    <section className="features-section">
      <h2>🔍 Mission Features</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <h3>{f.icon} {f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;



// // src/components/VaultCard.jsx
// import React, { useState } from 'react';
// import '../styles/VaultCard.css';
// import { QRCodeCanvas } from 'qrcode.react';
// import { auth } from '../firebaseConfig';
// import LogoutButton from './LogoutButton';
// import UserInfo from './UserInfo';

// const VaultCard = () => {
//   const [message, setMessage] = useState('');
//   const [unlockAt, setUnlockAt] = useState('');
//   const [expireAt, setExpireAt] = useState('');
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [generatedLink, setGeneratedLink] = useState('');
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!unlockAt || !expireAt || !recipientEmail) {
//       alert('Please fill all fields including recipient email.');
//       return;
//     }

//     const user = auth.currentUser;
//     if (!user) {
//       alert('User not logged in.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/message', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           message,
//           unlockAt: new Date(unlockAt).toISOString(),
//           expireAt: new Date(expireAt).toISOString(),
//           user: user.email,
//         }),
//       });

//       const data = await res.json();
//       const messageId = data.id;
//       const secretLink = `${window.location.origin}/message/${messageId}`;
//       setGeneratedLink(secretLink);
//       setIsFlipped(true);

//       // ✅ Send Email
//       const emailRes = await fetch('http://localhost:5000/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           recipientEmail,
//           senderEmail: user.email,
//           messageId: messageId,
//         }),
//       });

//       const emailData = await emailRes.json();
//       if (emailData.success) {
//         alert('✅ Message sent via email!');
//       } else {
//         alert('⚠️ Failed to send email.');
//       }

//     } catch (err) {
//       console.error('Error sending message:', err.message);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <div className="vault-container">
//       <LogoutButton />

//       <div className={`card-3d ${isFlipped ? 'flipped' : ''}`}>
//         {/* Front Side */}
//         <div className="card-face card-front">
//           <h1 className="title-glow">🔐 ClueVault</h1>
//           <p className="subtitle">Deploy your secret payload</p>
//           <form className="vault-form" onSubmit={handleSubmit}>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter secret message"
//               rows={4}
//               required
//             />
//             <input
//               type="email"
//               placeholder="Recipient's Email"
//               value={recipientEmail}
//               onChange={(e) => setRecipientEmail(e.target.value)}
//               required
//             />
//             <input
//               type="datetime-local"
//               value={unlockAt}
//               onChange={(e) => setUnlockAt(e.target.value)}
//               required
//             />
//             <input
//               type="datetime-local"
//               value={expireAt}
//               onChange={(e) => setExpireAt(e.target.value)}
//               required
//             />
//             <button type="submit">🚀 Deploy</button>
//           </form>
//         </div>

//         {/* Back Side */}
//         <div className="card-face card-back">
//           <h2 className="title-glow">🛰 Mission Link</h2>
//           <p className="result-text">{generatedLink}</p>
//           <button
//             className="copy-btn"
//             onClick={() => {
//               navigator.clipboard.writeText(generatedLink);
//               alert('Link copied!');
//             }}
//           >
//             Copy Link
//           </button>
//           <div className="qr-section">
//             <QRCodeCanvas value={generatedLink} size={180} />
//           </div>
//           <button className="reset-btn" onClick={() => {
//             setIsFlipped(false);
//             setMessage('');
//             setRecipientEmail('');
//             setGeneratedLink('');
//             setUnlockAt('');
//             setExpireAt('');
//           }}>
//             🔁 Create New
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VaultCard;

// src/components/VaultCard.jsx
// import React, { useState } from 'react';
// import '../styles/VaultCard.css';
// import { QRCodeCanvas } from 'qrcode.react';
// import { auth } from '../firebaseConfig';
// import UserInfo from './UserInfo';

// const VaultCard = () => {
//   const [message, setMessage] = useState('');
//   const [unlockAt, setUnlockAt] = useState('');
//   const [expireAt, setExpireAt] = useState('');
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [generatedLink, setGeneratedLink] = useState('');
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!unlockAt || !expireAt || !recipientEmail) {
//       alert('Please fill all fields including recipient email.');
//       return;
//     }

//     const user = auth.currentUser;
//     if (!user) {
//       alert('User not logged in.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/message', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           message,
//           unlockAt: new Date(unlockAt).toISOString(),
//           expireAt: new Date(expireAt).toISOString(),
//           user: user.email,
//         }),
//       });

//       const data = await res.json();
//       const messageId = data.id;
//       const secretLink = `${window.location.origin}/message/${messageId}`;
//       setGeneratedLink(secretLink);
//       setIsFlipped(true);

//       const emailRes = await fetch('http://localhost:5000/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           recipientEmail,
//           senderEmail: user.email,
//           messageId: messageId,
//         }),
//       });

//       const emailData = await emailRes.json();
//       if (emailData.success) {
//         alert('✅ Message sent via email!');
//       } else {
//         alert('⚠️ Failed to send email.');
//       }

//     } catch (err) {
//       console.error('Error sending message:', err.message);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <section className="vault-section" id="vault">
//       <div className="vault-wrapper">
//         <UserInfo />

//         <div className={`card-3d ${isFlipped ? 'flipped' : ''}`}>
//           {/* Front Side */}
//           <div className="card-face card-front">
//             <h1 className="title-glow">🔐 ClueVault</h1>
//             <p className="subtitle">Deploy your secret payload</p>

//             <form className="vault-form" onSubmit={handleSubmit}>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Enter secret message"
//                 rows={4}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Recipient's Email"
//                 value={recipientEmail}
//                 onChange={(e) => setRecipientEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="datetime-local"
//                 value={unlockAt}
//                 onChange={(e) => setUnlockAt(e.target.value)}
//                 required
//               />
//               <input
//                 type="datetime-local"
//                 value={expireAt}
//                 onChange={(e) => setExpireAt(e.target.value)}
//                 required
//               />
//               <button type="submit">🚀 Deploy</button>
//             </form>
//           </div>

//           {/* Back Side */}
//           <div className="card-face card-back">
//             <h2 className="title-glow">🛰 Mission Link</h2>
//             <p className="result-text">{generatedLink}</p>

//             <button
//               className="copy-btn"
//               onClick={() => {
//                 navigator.clipboard.writeText(generatedLink);
//                 alert('Link copied!');
//               }}
//             >
//               Copy Link
//             </button>

//             <div className="qr-section">
//               <QRCodeCanvas value={generatedLink} size={180} />
//             </div>

//             <button
//               className="reset-btn"
//               onClick={() => {
//                 setIsFlipped(false);
//                 setMessage('');
//                 setRecipientEmail('');
//                 setGeneratedLink('');
//                 setUnlockAt('');
//                 setExpireAt('');
//               }}
//             >
//               🔁 Create New
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VaultCard;

// import React, { useState } from 'react';
// import '../styles/VaultCard.css';
// import { QRCodeCanvas } from 'qrcode.react';
// import { auth } from '../firebaseConfig';
// import UserInfo from './UserInfo';

// const VaultCard = () => {
//   const [message, setMessage] = useState('');
//   const [unlockAt, setUnlockAt] = useState('');
//   const [expireAt, setExpireAt] = useState('');
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [generatedLink, setGeneratedLink] = useState('');
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!unlockAt || !expireAt || !recipientEmail) {
//       alert('Please fill all fields including recipient email.');
//       return;
//     }

//     const user = auth.currentUser;
//     if (!user) {
//       alert('User not logged in.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/message', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           message,
//           unlockAt: new Date(unlockAt).toISOString(),
//           expireAt: new Date(expireAt).toISOString(),
//           user: user.email,
//         }),
//       });

//       const data = await res.json();
//       const messageId = data.id;
//       const secretLink = `${window.location.origin}/message/${messageId}`;
//       setGeneratedLink(secretLink);
//       setIsFlipped(true);

//       const emailRes = await fetch('http://localhost:5000/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           recipientEmail,
//           senderEmail: user.email,
//           messageId: messageId,
//         }),
//       });

//       const emailData = await emailRes.json();
//       if (emailData.success) {
//         alert('✅ Message sent via email!');
//       } else {
//         alert('⚠️ Failed to send email.');
//       }

//     } catch (err) {
//       console.error('Error sending message:', err.message);
//       alert('Something went wrong!');
//     }
//   };

//   return (
//     <section className="vault-section" id="vault">
//       <div className="vault-wrapper" data-aos="fade-up">
//         <UserInfo />

//         <div className={`card-3d ${isFlipped ? 'flipped' : ''}`}>
//           {/* Front Side */}
//           <div className="card-face card-front">
//             <h1 className="title-glow">🔐 ClueVault</h1>
//             <p className="subtitle">Deploy your secret payload</p>

//             <form className="vault-form" onSubmit={handleSubmit}>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Enter secret message"
//                 rows={4}
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Recipient's Email"
//                 value={recipientEmail}
//                 onChange={(e) => setRecipientEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="datetime-local"
//                 value={unlockAt}
//                 onChange={(e) => setUnlockAt(e.target.value)}
//                 required
//               />
//               <input
//                 type="datetime-local"
//                 value={expireAt}
//                 onChange={(e) => setExpireAt(e.target.value)}
//                 required
//               />
//               <button type="submit">🚀 Deploy</button>
//             </form>
//           </div>

//           {/* Back Side */}
//           <div className="card-face card-back">
//             <h2 className="title-glow">🛰 Mission Link</h2>
//             <p className="result-text">{generatedLink}</p>

//             <button
//               className="copy-btn"
//               onClick={() => {
//                 navigator.clipboard.writeText(generatedLink);
//                 alert('Link copied!');
//               }}
//             >
//               Copy Link
//             </button>

//             <div className="qr-section">
//               <QRCodeCanvas value={generatedLink} size={180} />
//             </div>

//             <button
//               className="reset-btn"
//               onClick={() => {
//                 setIsFlipped(false);
//                 setMessage('');
//                 setRecipientEmail('');
//                 setGeneratedLink('');
//                 setUnlockAt('');
//                 setExpireAt('');
//               }}
//             >
//               🔁 Create New
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VaultCard;

//ps
// import React, { useState } from 'react';
// import '../styles/VaultCard.css';
// import { QRCodeCanvas } from 'qrcode.react';
// import { auth } from '../firebaseConfig';
// import UserInfo from './UserInfo';

// const VaultCard = () => {
//   const [message, setMessage] = useState('');
//   const [unlockAt, setUnlockAt] = useState('');
//   const [expireAt, setExpireAt] = useState('');
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [generatedLink, setGeneratedLink] = useState('');
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [improvedMsg, setImprovedMsg] = useState('');
//   const [loadingAI, setLoadingAI] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!unlockAt || !expireAt || !recipientEmail) {
//       alert('Please fill all fields including recipient email.');
//       return;
//     }

//     const user = auth.currentUser;
//     if (!user) {
//       alert('User not logged in.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/message', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           message,
//           unlockAt: new Date(unlockAt).toISOString(),
//           expireAt: new Date(expireAt).toISOString(),
//           user: user.email,
//         }),
//       });

//       const data = await res.json();
//       const messageId = data.id;
//       const secretLink = `${window.location.origin}/message/${messageId}`;
//       setGeneratedLink(secretLink);
//       setIsFlipped(true);

//       const emailRes = await fetch('http://localhost:5000/api/send-email', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           recipientEmail,
//           senderEmail: user.email,
//           messageId: messageId,
//         }),
//       });

//       const emailData = await emailRes.json();
//       if (emailData.success) {
//         alert('✅ Message sent via email!');
//       } else {
//         alert('⚠️ Failed to send email.');
//       }
//     } catch (err) {
//       console.error('Error sending message:', err.message);
//       alert('Something went wrong!');
//     }
//   };

//   const handleImproveMessage = async () => {
//     if (!message.trim()) {
//       alert('Please write a message first.');
//       return;
//     }

//     try {
//       setLoadingAI(true);
//       const res = await fetch('http://localhost:5000/api/rephrase', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ originalMessage: message }),
//       });

//       const data = await res.json();
//       setImprovedMsg(data.improvedMessage);
//     } catch (err) {
//       alert('⚠️ AI failed to enhance message.');
//       console.error(err.message);
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   return (
//     <section className="vault-section" id="vault">
//       <div className="vault-wrapper" data-aos="fade-up">
//         <UserInfo />

//         <div className={`card-3d ${isFlipped ? 'flipped' : ''}`}>
//           {/* Front Side */}
//           <div className="card-face card-front">
//             <h1 className="title-glow">🔐 ClueVault</h1>
//             <p className="subtitle">Deploy your secret payload</p>

//             <form className="vault-form" onSubmit={handleSubmit}>
//               <textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Enter secret message"
//                 rows={4}
//                 required
//               />

//               {loadingAI ? (
//                 <p style={{ color: '#aaa' }}>💡 Improving message...</p>
//               ) : (
//                 <button
//                   type="button"
//                   className="copy-btn"
//                   onClick={handleImproveMessage}
//                 >
//                   💡 Improve Message with AI
//                 </button>
//               )}

//               {improvedMsg && (
//                 <div
//                   style={{
//                     background: '#1c1c1c',
//                     color: '#fff',
//                     padding: '0.75rem',
//                     borderRadius: '8px',
//                     marginTop: '0.75rem',
//                     border: '1px solid #444',
//                   }}
//                 >
//                   <strong>🔁 Suggested Rephrase:</strong>
//                   <p style={{ marginTop: '0.5rem' }}>{improvedMsg}</p>
//                   <div style={{ marginTop: '0.5rem' }}>
//                     <button
//                       className="copy-btn"
//                       style={{ marginRight: '0.5rem' }}
//                       onClick={() => {
//                         setMessage(improvedMsg);
//                         setImprovedMsg('');
//                       }}
//                     >
//                       ✅ Use This
//                     </button>
//                     <button
//                       className="reset-btn"
//                       onClick={() => setImprovedMsg('')}
//                     >
//                       ❌ Discard
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <input
//                 type="email"
//                 placeholder="Recipient's Email"
//                 value={recipientEmail}
//                 onChange={(e) => setRecipientEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="datetime-local"
//                 value={unlockAt}
//                 onChange={(e) => setUnlockAt(e.target.value)}
//                 required
//               />
//               <input
//                 type="datetime-local"
//                 value={expireAt}
//                 onChange={(e) => setExpireAt(e.target.value)}
//                 required
//               />
//               <button type="submit">🚀 Deploy</button>
//             </form>
//           </div>

//           {/* Back Side */}
//           <div className="card-face card-back">
//             <h2 className="title-glow">🛰 Mission Link</h2>
//             <p className="result-text">{generatedLink}</p>

//             <button
//               className="copy-btn"
//               onClick={() => {
//                 navigator.clipboard.writeText(generatedLink);
//                 alert('Link copied!');
//               }}
//             >
//               Copy Link
//             </button>

//             <div className="qr-section">
//               <QRCodeCanvas value={generatedLink} size={180} />
//             </div>

//             <button
//               className="reset-btn"
//               onClick={() => {
//                 setIsFlipped(false);
//                 setMessage('');
//                 setRecipientEmail('');
//                 setGeneratedLink('');
//                 setUnlockAt('');
//                 setExpireAt('');
//                 setImprovedMsg('');
//               }}
//             >
//               🔁 Create New
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VaultCard;
// ps



import React, { useState } from 'react';
import '../styles/VaultCard.css';
import { QRCodeCanvas } from 'qrcode.react';
import { auth } from '../firebaseConfig'; // Assuming firebaseConfig is set up correctly
import UserInfo from './UserInfo'; // Assuming UserInfo component exists
import Navbar from './Navbar';

const VaultCard = () => {
  const [message, setMessage] = useState('');
  const [unlockAt, setUnlockAt] = useState('');
  const [expireAt, setExpireAt] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [improvedMsg, setImprovedMsg] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!unlockAt || !expireAt || !recipientEmail) {
      alert('Please fill all fields including recipient email.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('User not logged in. Please log in to create a message.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          unlockAt: new Date(unlockAt).toISOString(),
          expireAt: new Date(expireAt).toISOString(),
          user: user.email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const messageId = data.id;
      // Ensure window.location.origin is correct for your frontend deployment
      const secretLink = `${window.location.origin}/message/${messageId}`;
      setGeneratedLink(secretLink);
      setIsFlipped(true);

      // Send email
      const emailRes = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail,
          senderEmail: user.email,
          messageId: messageId,
        }),
      });

      const emailData = await emailRes.json();
      if (emailData.success) {
        alert('✅ Message sent via email!');
      } else {
        alert('⚠️ Failed to send email.');
        console.error('Email send failure data:', emailData);
      }
    } catch (err) {
      console.error('Error sending message:', err.message);
      alert(`Something went wrong creating the message: ${err.message}`);
    }
  };

  const handleImproveMessage = async () => {
  if (!message.trim()) {
    alert('Please write a message first.');
    return;
  }

  try {
    setLoadingAI(true);
    const res = await fetch('http://localhost:5000/api/rephrase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message }),  // ✅ corrected line
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Backend response not OK:', res.status, errorData);
      throw new Error(errorData.error || 'Unknown backend error');
    }

    const data = await res.json();
    setImprovedMsg(data.improvedMessage);
  } catch (err) {
    alert(`⚠️ AI failed to enhance message: ${err.message}`);
    console.error('Frontend error during rephrase:', err);
  } finally {
    setLoadingAI(false);
  }
};


  return (
    <div>
      <Navbar/>
    <section className="vault-section" id="vault">
      <div className="vault-wrapper" data-aos="fade-up">
        <UserInfo />

        <div className={`card-3d ${isFlipped ? 'flipped' : ''}`}>
          {/* Front Side */}
          <div className="card-face card-front">
            <h1 className="title-glow">🔐 ClueVault</h1>
            <p className="subtitle">Deploy your secret payload</p>

            <form className="vault-form" onSubmit={handleSubmit}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter secret message"
                rows={4}
                required
              />

              {loadingAI ? (
                <p style={{ color: '#aaa', textAlign: 'center', margin: '1rem 0' }}>💡 Improving message...</p>
              ) : (
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleImproveMessage}
                >
                  💡 Improve Message with AI
                </button>
              )}

              {improvedMsg && (
                <div
                  style={{
                    background: '#1c1c1c',
                    color: '#fff',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginTop: '0.75rem',
                    border: '1px solid #444',
                    wordWrap: 'break-word', // Ensure long words break
                  }}
                >
                  <strong>🔁 Suggested Rephrase:</strong>
                  <p style={{ marginTop: '0.5rem' }}>{improvedMsg}</p>
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        setMessage(improvedMsg);
                        setImprovedMsg('');
                      }}
                    >
                      ✅ Use This
                    </button>
                    <button
                      className="reset-btn"
                      onClick={() => setImprovedMsg('')}
                    >
                      ❌ Discard
                    </button>
                  </div>
                </div>
              )}

              <input
                type="email"
                placeholder="Recipient's Email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                required
              />
              <input
                type="datetime-local"
                value={unlockAt}
                onChange={(e) => setUnlockAt(e.target.value)}
                required
              />
              <input
                type="datetime-local"
                value={expireAt}
                onChange={(e) => setExpireAt(e.target.value)}
                required
              />
              <button type="submit">🚀 Deploy</button>
            </form>
          </div>

          {/* Back Side */}
          <div className="card-face card-back">
            <h2 className="title-glow">🛰 Mission Link</h2>
            <p className="result-text">{generatedLink}</p>

            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(generatedLink);
                alert('Link copied!');
              }}
            >
              Copy Link
            </button>

            <div className="qr-section">
              {generatedLink && <QRCodeCanvas value={generatedLink} size={180} level="H" />}
              {!generatedLink && <p style={{ color: '#aaa' }}>Link not yet generated for QR code.</p>}
            </div>

            <button
              className="reset-btn"
              onClick={() => {
                setIsFlipped(false);
                setMessage('');
                setRecipientEmail('');
                setGeneratedLink('');
                setUnlockAt('');
                setExpireAt('');
                setImprovedMsg(''); // Reset improved message on new creation
              }}
            >
              🔁 Create New
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default VaultCard;
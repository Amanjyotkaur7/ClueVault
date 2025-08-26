// // // src/pages/Dashboard.jsx
// // import React, { useEffect, useState } from 'react';
// // import { auth } from '../firebaseConfig';
// // import { onAuthStateChanged } from 'firebase/auth';

// // const Dashboard = () => {
// //   const [messages, setMessages] = useState([]);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       if (!user) return;

// //       try {
// //         const res = await fetch(`http://localhost:5000/api/messages/${user.email}`);
// //         const data = await res.json();
// //         setMessages(data);
// //       } catch (err) {
// //         console.error('Error fetching message history:', err);
// //       }
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   return (
// //     <div style={{ padding: '2rem' }}>
// //       <h2>Your Message History 📜</h2>
// //       {messages.length === 0 ? (
// //         <p>No messages found.</p>
// //       ) : (
// //         <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
// //           <thead style={{ backgroundColor: '#f5f5f5' }}>
// //             <tr>
// //               <th style={{ padding: '8px', textAlign: 'left' }}>Message Preview</th>
// //               <th style={{ padding: '8px', textAlign: 'left' }}>Unlock At</th>
// //               <th style={{ padding: '8px', textAlign: 'left' }}>Expire At</th>
// //               <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {messages.map((msg) => (
// //               <tr key={msg.id} style={{ borderBottom: '1px solid #ccc' }}>
// //                 <td style={{ padding: '8px' }}>{msg.content}</td>
// //                 <td style={{ padding: '8px' }}>{new Date(msg.unlockAt).toLocaleString()}</td>
// //                 <td style={{ padding: '8px' }}>{new Date(msg.expireAt).toLocaleString()}</td>
// //                 <td style={{ padding: '8px', fontWeight: 'bold' }}>{msg.status}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { auth } from '../firebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import Navbar from '../components/Navbar';
// import '../styles/VaultCard.css';

// const Dashboard = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) return;

//       try {
//         const res = await fetch(`http://localhost:5000/api/messages/${user.email}`);
//         const data = await res.json();
//         setMessages(data);
//       } catch (err) {
//         console.error('Error fetching message history:', err);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = () => {
//     auth.signOut().then(() => {
//       window.location.href = '/login';
//     });
//   };

//   return (
//     <div className="vault-container">
//       {/* 🔮 Background Animation */}
//       <div id="background-animation"></div>
//       <div id="floating-blur"></div>

//       {/* 🧭 Navigation */}
//       <Navbar onLogout={handleLogout} />

//       <div style={{ padding: '2rem', width: '100%', maxWidth: '1000px' }}>
//         <h2 style={{ color: '#a855f7', textShadow: '0 0 10px #9333ea' }}>
//           🧾 Your Message History
//         </h2>

//         {messages.length === 0 ? (
//           <p style={{ color: '#ccc', marginTop: '1rem' }}>No messages found.</p>
//         ) : (
//           <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
//             <table style={{
//               width: '100%',
//               borderCollapse: 'collapse',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               background: 'rgba(255,255,255,0.02)',
//               backdropFilter: 'blur(10px)',
//               boxShadow: '0 0 15px rgba(168,85,247,0.2)',
//               color: '#eee'
//             }}>
//               <thead style={{ backgroundColor: '#1f1f1f' }}>
//                 <tr>
//                   <th style={{ padding: '12px', textAlign: 'left' }}>🧠 Preview</th>
//                   <th style={{ padding: '12px', textAlign: 'left' }}>⏳ Unlock At</th>
//                   <th style={{ padding: '12px', textAlign: 'left' }}>⌛ Expire At</th>
//                   <th style={{ padding: '12px', textAlign: 'left' }}>📌 Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {messages.map((msg) => (
//                   <tr key={msg.id} style={{ borderBottom: '1px solid #333' }}>
//                     <td style={{ padding: '10px' }}>{msg.content}</td>
//                     <td style={{ padding: '10px' }}>{new Date(msg.unlockAt).toLocaleString()}</td>
//                     <td style={{ padding: '10px' }}>{new Date(msg.expireAt).toLocaleString()}</td>
//                     <td style={{
//                       padding: '10px',
//                       fontWeight: 'bold',
//                       color: msg.status === 'Viewed' ? '#4ade80' :
//                              msg.status === 'Expired' ? '#f87171' :
//                              msg.status === 'Locked' ? '#facc15' : '#60a5fa'
//                     }}>
//                       {msg.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const res = await fetch(`http://localhost:5000/api/messages/${user.email}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error('Error fetching message history:', err);
      }
    });

    return () => unsubscribe();
  }, []);



  const handleDelete = (id) => {
    const updated = messages.filter((msg) => msg.id !== id);
    setMessages(updated);
    // Note: Real deletion on server not implemented in this version.
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'All') return true;
    return msg.status === filter;
  });

  return (
    <div><Navbar  />
    <div className="vault-container">
      <div id="background-animation"></div>
      <div id="floating-blur"></div>
 
      

      <div style={{ padding: '2rem', width: '100%', maxWidth: '1000px' }}>
        <h2 style={{ color: '#a855f7', textShadow: '0 0 10px #9333ea' }}>🧾 Your Message History</h2>

        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <label style={{ color: '#ccc', marginRight: '1rem' }}>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '0.4rem 0.7rem',
              background: '#1c1c1c',
              color: '#fff',
              borderRadius: '6px',
              border: '1px solid #444'
            }}
          >
            <option>All</option>
            <option>Viewed</option>
            <option>Expired</option>
            <option>Locked</option>
            <option>Active</option>
          </select>
        </div>

        {filteredMessages.length === 0 ? (
          <p style={{ color: '#ccc', marginTop: '1rem' }}>No messages found.</p>
        ) : (
          <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 0 15px rgba(168,85,247,0.2)',
              color: '#eee'
            }}>
              <thead style={{ backgroundColor: '#1f1f1f' }}>
                <tr>
                  <th style={{ padding: '12px' }}>🧠 Preview</th>
                  <th style={{ padding: '12px' }}>⏳ Unlock</th>
                  <th style={{ padding: '12px' }}>⌛ Expire</th>
                  <th style={{ padding: '12px' }}>📌 Status</th>
                  <th style={{ padding: '12px' }}>🗑 Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg) => (
                  <tr key={msg.id} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '10px' }}>{msg.content}</td>
                    <td style={{ padding: '10px' }}>{new Date(msg.unlockAt).toLocaleString()}</td>
                    <td style={{ padding: '10px' }}>{new Date(msg.expireAt).toLocaleString()}</td>
                    <td style={{
                      padding: '10px',
                      fontWeight: 'bold',
                      color: msg.status === 'Viewed' ? '#4ade80' :
                             msg.status === 'Expired' ? '#f87171' :
                             msg.status === 'Locked' ? '#facc15' : '#60a5fa'
                    }}>{msg.status}</td>
                    <td style={{ padding: '10px' }}>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        style={{
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;


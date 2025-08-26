// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const MessageViewer = () => {
//   const { id } = useParams();
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('loading');

//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/message/${id}`);
//         if (res.ok) {
//           const data = await res.json();
//           setMessage(data.message);
//           setStatus('success');
//         } else {
//           setStatus('not-found');
//         }
//       } catch (err) {
//         setStatus('error');
//       }
//     };

//     fetchMessage();
//   }, [id]);

//   if (status === 'loading') return <p>Loading your secret message...</p>;
//   if (status === 'not-found') return <p>This message has already been viewed or does not exist.</p>;
//   if (status === 'error') return <p>Something went wrong. Try again later.</p>;

//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <h2>🕵️ Secret Message:</h2>
//       <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{message}</p>
//     </div>
//   );
// };

// export default MessageViewer;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const MessageViewer = () => {
//   const { id } = useParams();
//   const [expireAt, setExpireAt] = useState(null);
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('loading');
//   const [unlockTime, setUnlockTime] = useState(null);
//   const [countdown, setCountdown] = useState('');

//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/message/${id}`);
//         if (res.ok) {
//           const data = await res.json();
//           setMessage(data.message);
//           setExpireAt(new Date(data.expireAt));
//           setStatus('success');
//         } else {
//           const errData = await res.json();
//           if (errData.error === 'Message not yet available. Check back later.') {
//             // Request unlock time
//             const timeRes = await fetch(`http://localhost:5000/api/message/unlock-time/${id}`);
//             const { unlockAt } = await timeRes.json();
//             setUnlockTime(new Date(unlockAt));
//             setStatus('waiting');
//           } else {
//             setStatus('error');
//           }
//         }
//       } catch (err) {
//         setStatus('error');
//       }
//     };

//     fetchMessage();
//   }, [id]);

//   // Timer logic
//   useEffect(() => {
//     if (status === 'waiting' && unlockTime) {
//       const interval = setInterval(() => {
//         const now = new Date();
//         const diff = unlockTime - now;

//         if (diff <= 0) {
//           window.location.reload(); // Try fetching the message again
//         } else {
//           const minutes = Math.floor(diff / 60000);
//           const seconds = Math.floor((diff % 60000) / 1000);
//           setCountdown(
//             `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
//           );
//         }
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [status, unlockTime]);

//   if (status === 'loading') return <p>Loading your secret message...</p>;
//   if (status === 'error') return <p>❌ Message not found or has expired.</p>;

//   if (status === 'waiting') {
//     return (
//       <div style={{ textAlign: 'center', marginTop: '2rem' }}>
//         <h2>🔒 Message is Locked</h2>
//         <p>Will unlock in: <strong>{countdown}</strong></p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: '2rem', textAlign: 'center' }}>
//       <h2>🕵️ Secret Message:</h2>
//       <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{message}</p>
//     </div>
//   );
// };

// export default MessageViewer;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MessageViewer = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('loading');
  const [unlockTime, setUnlockTime] = useState(null);
  const [expireAt, setExpireAt] = useState(null);
  const [countdown, setCountdown] = useState('');

  // Fetch message
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/message/${id}`);

        if (res.ok) {
          const data = await res.json();
          setMessage(data.message);
          setExpireAt(new Date(data.expireAt)); // ✅ Save expire time for countdown
          setStatus('success');
        } else {
          const errData = await res.json();
          if (errData.error === 'Message not yet available.') {
            // Get unlock time
            const timeRes = await fetch(`http://localhost:5000/api/message/unlock-time/${id}`);
            const timeData = await timeRes.json();
            setUnlockTime(new Date(timeData.unlockAt));
            setStatus('waiting');
          } else {
            setStatus('error');
          }
        }
      } catch (err) {
        setStatus('error');
      }
    };

    fetchMessage();
  }, [id]);

  // Countdown for unlock time
  useEffect(() => {
    if (status === 'waiting' && unlockTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = unlockTime - now;

        if (diff <= 0) {
          window.location.reload(); // Try to fetch again when time unlocks
        } else {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setCountdown(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, unlockTime]);

  // Auto-expire logic while viewing
  useEffect(() => {
    if (status === 'success' && expireAt) {
      const interval = setInterval(() => {
        const now = new Date();
        if (now > expireAt) {
          setStatus('expired');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, expireAt]);

  // UI rendering
  if (status === 'loading') return <p>Loading your secret message...</p>;
  if (status === 'error') return <p>❌ Message not found or has expired.</p>;
  if (status === 'expired') return <p>⛔ This message has expired and is no longer accessible.</p>;
  if (status === 'waiting')
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>🔒 Message is Locked</h2>
        <p>Will unlock in: <strong>{countdown}</strong></p>
      </div>
    );

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🕵️ Secret Message:</h2>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{message}</p>
    </div>
  );
};

export default MessageViewer;


// // // backend/server.js
// // const express = require('express');
// // const cors = require('cors');
// // const { v4: uuidv4 } = require('uuid');

// // const app = express();
// // const PORT = 5000;

// // app.use(cors());
// // app.use(express.json());

// // // Temporary in-memory store
// // const messages = {};

// // // POST /api/message → store a new message
// // app.post('/api/message', (req, res) => {
// //   const { message } = req.body;
// //   const id = uuidv4();
// //   messages[id] = message;
// //   res.json({ id });
// // });

// // // GET /api/message/:id → fetch + delete the message
// // app.get('/api/message/:id', (req, res) => {
// //   const { id } = req.params;
// //   const message = messages[id];

// //   if (!message) {
// //     return res.status(404).json({ error: 'Message not found or already viewed' });
// //   }

// //   // Delete the message after it's read
// //   delete messages[id];
// //   res.json({ message });
// // });

// // app.listen(PORT, () => {
// //   console.log(` ClueVault backend running at http://localhost:${PORT}`);
// // });

// // backend/server.js
// // const express = require('express');
// // const cors = require('cors');
// // const { v4: uuidv4 } = require('uuid');

// // const app = express();
// // const PORT = 5000;

// // app.use(cors());
// // app.use(express.json());

// // // In-memory message store
// // const messages = {};

// // // Create a new message
// // app.post('/api/message', (req, res) => {
// //   const { message, unlockAt, expireAt } = req.body;

// //   const id = uuidv4();

// //   messages[id] = {
// //     content: message,
// //     unlockAt: new Date(unlockAt), // exact unlock time
// //     expireAt: new Date(expireAt), // exact expiry time
// //   };

// //   res.json({ id });
// // });

// // // Get and delete a message
// // app.get('/api/message/:id', (req, res) => {
// //   const { id } = req.params;
// //   const msg = messages[id];

// //   if (!msg) {
// //     return res.status(404).json({ error: 'Message not found or already viewed.' });
// //   }

// //   const now = new Date();

// //   if (now < msg.unlockAt) {
// //     return res.status(403).json({ error: 'Message not yet available. Check back later.' });
// //   }

// //   if (now > msg.expireAt) {
// //     delete messages[id]; // Clean up expired message
// //     return res.status(410).json({ error: 'Message has expired.' });
// //   }

// //   const content = msg.content;
// //   delete messages[id]; // One-time view
// //   res.json({ message: content });
// // });

// // // Get only the unlock time (for countdown)
// // app.get('/api/message/unlock-time/:id', (req, res) => {
// //   const { id } = req.params;
// //   const msg = messages[id];

// //   if (!msg) {
// //     return res.status(404).json({ error: 'Message not found.' });
// //   }

// //   res.json({ unlockAt: msg.unlockAt });
// // });

// // app.listen(PORT, () => {
// //   console.log(`🔐 ClueVault backend running at http://localhost:${PORT}`);
// // });

// // const express = require('express');
// // const cors = require('cors');
// // const { v4: uuidv4 } = require('uuid');

// // const app = express();
// // const PORT = 5000;

// // app.use(cors());
// // app.use(express.json());

// // const messages = {}; // In-memory store

// // // POST: Create a message
// // app.post('/api/message', (req, res) => {
// //   const { message, unlockAt, expireAt, user } = req.body;
// //   console.log("📨 New message from user:", user);

// //   const id = uuidv4();

// //   messages[id] = {
// //     content: message,
// //     unlockAt: new Date(unlockAt),
// //     expireAt: new Date(expireAt),
// //     user, // user's email
// //     createdAt: new Date(),
// //     viewed: false,
// //   };

// //   res.json({ id });
// // });

// // // GET: View a message
// // app.get('/api/message/:id', (req, res) => {
// //   const { id } = req.params;
// //   const msg = messages[id];
// //   const now = new Date();

// //   if (!msg) return res.status(404).json({ error: 'Message not found or already viewed.' });

// //   if (now < msg.unlockAt) return res.status(403).json({ error: 'Message not yet available.' });

// //   if (now > msg.expireAt) {
// //     delete messages[id];
// //     return res.status(410).json({ error: 'Message has expired.' });
// //   }

// //   const content = msg.content;
// //   messages[id].viewed = true;
// //   // delete messages[id]; // delete after viewing
// //  res.json({ message: msg.content, expireAt: msg.expireAt });

// // });

// // // GET: Unlock time only (for countdown)
// // app.get('/api/message/unlock-time/:id', (req, res) => {
// //   const { id } = req.params;
// //   const msg = messages[id];
// //   if (!msg) return res.status(404).json({ error: 'Message not found.' });

// //   res.json({ unlockAt: msg.unlockAt });
// // });

// // // GET: Messages created by a user
// // app.get('/api/messages/:user', (req, res) => {
// //   const { user } = req.params;
// //   const now = new Date();
// //   const userMessages = [];

// //   for (const id in messages) {
// //     const msg = messages[id];
// //     if (msg.user === user) {
// //       const status = msg.viewed
// //         ? 'Viewed'
// //         : now > msg.expireAt
// //         ? 'Expired'
// //         : now < msg.unlockAt
// //         ? 'Locked'
// //         : 'Active';

// //       userMessages.push({
// //         id,
// //         content: msg.content.substring(0, 60) + '...',
// //         createdAt: msg.createdAt,
// //         unlockAt: msg.unlockAt,
// //         expireAt: msg.expireAt,
// //         status,
// //       });
// //     }
// //   }

// //   res.json(userMessages.reverse());
// // });
// // app.get('/api/debug/all-messages', (req, res) => {
// //   res.json(messages);
// // });

// // //  Auto-delete expired messages every 60 seconds
// // setInterval(() => {
// //   const now = new Date();
// //   for (const id in messages) {
// //     if (now > messages[id].expireAt) {
// //       console.log(`🗑️ Deleting expired message: ${id}`);
// //       delete messages[id];
// //     }
// //   }
// // }, 60 * 1000); // 60,000 ms = 1 minute

// // app.get('/api/debug/all-messages', (req, res) => {
// //   res.json(messages);
// // }); //temp

// // app.listen(PORT, () => {
// //   console.log(` ClueVault backend running at http://localhost:${PORT}`);
// // });


// const express = require('express');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const messages = {}; // In-memory store

// // POST: Create a message
// app.post('/api/message', (req, res) => {
//   const { message, unlockAt, expireAt, user } = req.body;
//   console.log("📨 New message from user:", user);

//   const id = uuidv4();

//   messages[id] = {
//     content: message,
//     unlockAt: new Date(unlockAt),
//     expireAt: new Date(expireAt),
//     user, // user's email
//     createdAt: new Date(),
//     viewed: false,
//   };

//   res.json({ id });
// });

// // GET: View a message
// app.get('/api/message/:id', (req, res) => {
//   const { id } = req.params;
//   const msg = messages[id];
//   const now = new Date();

//   if (!msg) return res.status(404).json({ error: 'Message not found or already viewed.' });

//   if (now < msg.unlockAt) return res.status(403).json({ error: 'Message not yet available.' });

//   if (now > msg.expireAt) {
//     delete messages[id];
//     return res.status(410).json({ error: 'Message has expired.' });
//   }

//   messages[id].viewed = true;
//   res.json({ message: msg.content, expireAt: msg.expireAt });
// });

// // GET: Unlock time only (for countdown)
// app.get('/api/message/unlock-time/:id', (req, res) => {
//   const { id } = req.params;
//   const msg = messages[id];
//   if (!msg) return res.status(404).json({ error: 'Message not found.' });

//   res.json({ unlockAt: msg.unlockAt });
// });

// // GET: Messages created by a user
// app.get('/api/messages/:user', (req, res) => {
//   const { user } = req.params;
//   const now = new Date();
//   const userMessages = [];

//   for (const id in messages) {
//     const msg = messages[id];
//     if (msg.user === user) {
//       const status = msg.viewed
//         ? 'Viewed'
//         : now > msg.expireAt
//         ? 'Expired'
//         : now < msg.unlockAt
//         ? 'Locked'
//         : 'Active';

//       userMessages.push({
//         id,
//         content: msg.content.substring(0, 60) + '...',
//         createdAt: msg.createdAt,
//         unlockAt: msg.unlockAt,
//         expireAt: msg.expireAt,
//         status,
//       });
//     }
//   }

//   res.json(userMessages.reverse());
// });

// // ✅ Debug route: view all stored messages
// app.get('/api/debug/all-messages', (req, res) => {
//   res.json(messages);
// });

// // 🧹 Auto-delete expired messages every 60 seconds
// setInterval(() => {
//   const now = new Date();
//   for (const id in messages) {
//     if (now > messages[id].expireAt) {
//       console.log(`🗑️ Deleting expired message: ${id}`);
//       delete messages[id];
//     }
//   }
// }, 60 * 1000);

// app.listen(PORT, () => {
//   console.log(`🔐 ClueVault backend running at http://localhost:${PORT}`);
// });


// Full Express server with email + QR support



// ps
// const express = require('express');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');
// const nodemailer = require('nodemailer');
// const QRCode = require('qrcode');
// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('📡 MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());
// const rephraseRoute = require('./routes/rephrase');
// app.use('/api/rephrase', rephraseRoute);

// const zoneMessagesRoute = require('./routes/zoneMessages');
// app.use('/api/zone-message', zoneMessagesRoute); // POST + GET/:zone

// const messages = {}; // In-memory store

// // POST: Create a message
// app.post('/api/message', (req, res) => {
//   const { message, unlockAt, expireAt, user } = req.body;
//   console.log("📨 New message from user:", user);

//   const id = uuidv4();

//   messages[id] = {
//     content: message,
//     unlockAt: new Date(unlockAt),
//     expireAt: new Date(expireAt),
//     user,
//     createdAt: new Date(),
//     viewed: false,
//   };

//   res.json({ id });
// });

// // GET: View a message
// app.get('/api/message/:id', (req, res) => {
//   const { id } = req.params;
//   const msg = messages[id];
//   const now = new Date();

//   if (!msg) return res.status(404).json({ error: 'Message not found or already viewed.' });
//   if (now < msg.unlockAt) return res.status(403).json({ error: 'Message not yet available.' });
//   if (now > msg.expireAt) {
//     delete messages[id];
//     return res.status(410).json({ error: 'Message has expired.' });
//   }

//   messages[id].viewed = true;
//   res.json({ message: msg.content, expireAt: msg.expireAt });
// });

// // GET: Unlock time only
// app.get('/api/message/unlock-time/:id', (req, res) => {
//   const { id } = req.params;
//   const msg = messages[id];
//   if (!msg) return res.status(404).json({ error: 'Message not found.' });
//   res.json({ unlockAt: msg.unlockAt });
// });

// // GET: Messages created by a user
// app.get('/api/messages/:user', (req, res) => {
//   const { user } = req.params;
//   const now = new Date();
//   const userMessages = [];

//   for (const id in messages) {
//     const msg = messages[id];
//     if (msg.user === user) {
//       const status = msg.viewed
//         ? 'Viewed'
//         : now > msg.expireAt
//         ? 'Expired'
//         : now < msg.unlockAt
//         ? 'Locked'
//         : 'Active';

//       userMessages.push({
//         id,
//         content: msg.content.substring(0, 60) + '...',
//         createdAt: msg.createdAt,
//         unlockAt: msg.unlockAt,
//         expireAt: msg.expireAt,
//         status,
//       });
//     }
//   }

//   res.json(userMessages.reverse());
// });

// // GET: Debug all messages
// app.get('/api/debug/all-messages', (req, res) => {
//   res.json(messages);
// });

// // POST: Send email with QR
// app.post('/api/send-email', async (req, res) => {
//   const { recipientEmail, senderEmail, messageId } = req.body;

//   if (!recipientEmail || !senderEmail || !messageId) {
//     return res.status(400).json({ error: 'Missing required fields.' });
//   }

//   const messageUrl = `${process.env.FRONTEND_URL}/message/${messageId}`;
//   const qrDataURL = await QRCode.toDataURL(messageUrl);

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"ClueVault" <${process.env.GMAIL_USER}>`,
//     to: recipientEmail,
//     subject: '🔐 You’ve received a secret message on ClueVault',
//     html: `
//       <h3>Hello Agent,</h3>
//       <p><strong>${senderEmail}</strong> has sent you a secret message using ClueVault.</p>
//       <p><a href="${messageUrl}">Click here to open the vault 🔓</a></p>
//       <p>Or scan this QR:</p>
//       <img src="${qrDataURL}" alt="ClueVault QR Code" width="180"/>
//       <br/><br/><em>This message is secure and one-time only.</em>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Email sent to ${recipientEmail}`);
//     res.json({ success: true });
//   } catch (err) {
//     console.error('❌ Email sending error:', err.message);
//     res.status(500).json({ error: 'Email sending failed.' });
//   }
// });

// // Auto-delete expired messages
// setInterval(() => {
//   const now = new Date();
//   for (const id in messages) {
//     if (now > messages[id].expireAt) {
//       console.log(`🗑️ Deleting expired message: ${id}`);
//       delete messages[id];
//     }
//   }
// }, 60 * 1000);





// app.listen(PORT, () => {
//   console.log(`🔐 ClueVault backend running at http://localhost:${PORT}`);
// });
// ps

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables FIRST

// --- Debugging for Environment Variables ---
console.log('--- Environment Variable Debugging ---');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Not Loaded');
console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Loaded' : 'Not Loaded');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL ? 'Loaded' : 'Not Loaded');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Loaded' : 'Not Loaded');
if (process.env.GEMINI_API_KEY) {
    console.log('GEMINI_API_KEY first 5 chars:', process.env.GEMINI_API_KEY.substring(0, 5) + '...');
} else {
    console.log('GEMINI_API_KEY value is undefined or empty.');
}
console.log('------------------------------------');
// --- End Debugging ---


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('📡 MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Make sure rephraseRoute is defined after dotenv is loaded
const rephraseRoute = require('./routes/rephrase');
app.use('/api/rephrase', rephraseRoute);

const zoneMessagesRoute = require('./routes/zoneMessages');
app.use('/api/zone-message', zoneMessagesRoute); // POST + GET/:zone

const messages = {}; // In-memory store

// ... (rest of your app.js code) ...

// POST: Create a message
app.post('/api/message', (req, res) => {
  const { message, unlockAt, expireAt, user } = req.body;
  console.log("📨 New message from user:", user);

  const id = uuidv4();

  messages[id] = {
    content: message,
    unlockAt: new Date(unlockAt),
    expireAt: new Date(expireAt),
    user,
    createdAt: new Date(),
    viewed: false,
  };

  res.json({ id });
});

// GET: View a message
app.get('/api/message/:id', (req, res) => {
  const { id } = req.params;
  const msg = messages[id];
  const now = new Date();

  if (!msg) return res.status(404).json({ error: 'Message not found or already viewed.' });
  if (now < msg.unlockAt) return res.status(403).json({ error: 'Message not yet available.' });
  if (now > msg.expireAt) {
    delete messages[id];
    return res.status(410).json({ error: 'Message has expired.' });
  }

  messages[id].viewed = true;
  res.json({ message: msg.content, expireAt: msg.expireAt });
});

// GET: Unlock time only
app.get('/api/message/unlock-time/:id', (req, res) => {
  const { id } = req.params;
  const msg = messages[id];
  if (!msg) return res.status(404).json({ error: 'Message not found.' });
  res.json({ unlockAt: msg.unlockAt });
});

// GET: Messages created by a user
app.get('/api/messages/:user', (req, res) => {
  const { user } = req.params;
  const now = new Date();
  const userMessages = [];

  for (const id in messages) {
    const msg = messages[id];
    if (msg.user === user) {
      const status = msg.viewed
        ? 'Viewed'
        : now > msg.expireAt
        ? 'Expired'
        : now < msg.unlockAt
        ? 'Locked'
        : 'Active';

      userMessages.push({
        id,
        content: msg.content.substring(0, 60) + '...',
        createdAt: msg.createdAt,
        unlockAt: msg.unlockAt,
        expireAt: msg.expireAt,
        status,
      });
    }
  }

  res.json(userMessages.reverse());
});

// GET: Debug all messages
app.get('/api/debug/all-messages', (req, res) => {
  res.json(messages);
});

// POST: Send email with QR
app.post('/api/send-email', async (req, res) => {
  const { recipientEmail, senderEmail, messageId } = req.body;

  if (!recipientEmail || !senderEmail || !messageId) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const messageUrl = `${process.env.FRONTEND_URL}/message/${messageId}`;
  const qrDataURL = await QRCode.toDataURL(messageUrl);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ClueVault" <${process.env.GMAIL_USER}>`,
    to: recipientEmail,
    subject: '🔐 You’ve received a secret message on ClueVault',
    html: `
      <h3>Hello Agent,</h3>
      <p><strong>${senderEmail}</strong> has sent you a secret message using ClueVault.</p>
      <p><a href="${messageUrl}">Click here to open the vault 🔓</a></p>
      <p>Or scan this QR:</p>
      <img src="${qrDataURL}" alt="ClueVault QR Code" width="180"/>
      <br/><br/><em>This message is secure and one-time only.</em>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${recipientEmail}`);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Email sending error:', err.message);
    res.status(500).json({ error: 'Email sending failed.' });
  }
});

// Auto-delete expired messages
setInterval(() => {
  const now = new Date();
  for (const id in messages) {
    if (now > messages[id].expireAt) {
      console.log(`🗑️ Deleting expired message: ${id}`);
      delete messages[id];
    }
  }
}, 60 * 1000);


app.listen(PORT, () => {
  console.log(`🔐 ClueVault backend running at http://localhost:${PORT}`);
});
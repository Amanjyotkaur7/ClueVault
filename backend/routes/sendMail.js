// // backend/routes/sendMail.js
// const express = require('express');
// const nodemailer = require('nodemailer');
// const QRCode = require('qrcode');
// require('dotenv').config();

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { recipientEmail, senderEmail, messageId } = req.body;

//   if (!recipientEmail || !senderEmail || !messageId) {
//     return res.status(400).json({ error: 'Missing fields' });
//   }

//   const messageLink = `${process.env.FRONTEND_URL}/message/${messageId}`;

//   try {
//     const qrDataURL = await QRCode.toDataURL(messageLink);

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"ClueVault" <${process.env.GMAIL_USER}>`,
//       to: recipientEmail,
//       subject: '🔐 You’ve received a secret ClueVault message',
//       html: `
//         <p>Hi there,</p>
//         <p><strong>${senderEmail}</strong> has sent you a secret message via ClueVault.</p>
//         <p>Click the link below to view it:</p>
//         <a href="${messageLink}">${messageLink}</a>
//         <p>Or scan this QR code:</p>
//         <img src="${qrDataURL}" alt="QR Code" width="200"/>
//         <br/><br/>
//         <small>This is a one-time secure message. Do not share this link with others.</small>
//       `,
//     });

//     res.status(200).json({ success: true, message: 'Email sent successfully!' });
//   } catch (error) {
//     console.error('Email send error:', error.message);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// });

// module.exports = router;

// backend/routes/sendMail.js
const express = require('express');
const nodemailer = require('nodemailer');
const QRCode = require('qrcode');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { recipientEmail, senderEmail, messageId } = req.body;

  if (!recipientEmail || !senderEmail || !messageId) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const messageLink = `${process.env.FRONTEND_URL}/message/${messageId}`;

  try {
    // ✅ Generate QR Code buffer
    const qrBuffer = await QRCode.toBuffer(messageLink);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ClueVault" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      subject: '🔐 You’ve received a secret ClueVault message',
      html: `
        <p>Hi there,</p>
        <p><strong>${senderEmail}</strong> has sent you a secret message via ClueVault.</p>
        <p>Click the link below to view it:</p>
        <a href="${messageLink}">${messageLink}</a>
        <p>Or scan this QR code:</p>
        <img src="cid:qrImage" alt="QR Code" width="200"/>
        <br/><br/>
        <small>This is a one-time secure message. Do not share this link with others.</small>
      `,
      attachments: [
        {
          filename: 'cluevault-qr.png',
          content: qrBuffer,
          cid: 'qrImage', // 👈 referenced in img src
        },
      ],
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;


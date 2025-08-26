const express = require('express');
const router = express.Router();
const ZoneMessage = require('../models/ZoneMessage');

// POST: Create zone message
router.post('/', async (req, res) => {
  const { zone, content } = req.body;
  if (!zone || !content) {
    return res.status(400).json({ error: 'Zone and content required' });
  }

  try {
    const msg = new ZoneMessage({ zone, content });
    await msg.save();
    res.status(201).json({ success: true, message: 'Message saved' });
  } catch (err) {
    console.error('❌ Error saving zone message:', err.message);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET: Fetch messages for a zone
router.get('/:zone', async (req, res) => {
  const { zone } = req.params;
  try {
    const messages = await ZoneMessage.find({ zone }).sort({ createdAt: -1 }).limit(50);
    res.json(messages);
  } catch (err) {
    console.error('❌ Error fetching messages:', err.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;

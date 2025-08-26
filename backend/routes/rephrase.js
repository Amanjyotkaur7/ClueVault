// routes/rephrase.js
const express = require('express');
const router = express.Router();
const { generateResponse } = require('../utils/gemini'); // adjust path if needed

// POST /api/rephrase
router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const aiReply = await generateResponse(prompt);
    res.json({ response: aiReply });
  } catch (error) {w
    console.error("Gemini AI rephrase error:", error.message);
    res.status(500).json({ error: 'Failed to generate response from AI' });
  }
});

module.exports = router; // ✅ IMPORTANT: Exports the Express Router

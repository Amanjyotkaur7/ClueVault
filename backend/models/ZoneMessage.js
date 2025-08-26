const mongoose = require('mongoose');

const ZoneMessageSchema = new mongoose.Schema({
  zone: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ZoneMessage', ZoneMessageSchema);

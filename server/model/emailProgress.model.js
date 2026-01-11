const mongoose = require('mongoose');

const emailProgressSchema = new mongoose.Schema({
  fileHash: { type: String, unique: true },
  totalEmails: Number,
  lastSentIndex: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('EmailProgress', emailProgressSchema);

const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  stake: { type: Number, required: true },
  odds: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'won', 'lost', 'void', 'cancelled', 'closed'], default: 'pending' },
  units: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', predictionSchema);

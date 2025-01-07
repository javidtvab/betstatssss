const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  stake: { type: Number, required: true },
  odds: { type: Number, required: true },
  sport: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'won', 'lost', 'void', 'null', 'closed'], default: 'pending' },
  units: { type: Number, default: 0 }, // Unidades ganadas o perdidas
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);

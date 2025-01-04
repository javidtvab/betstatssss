const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  role: { type: String, enum: ['basic', 'premium'], default: 'basic' },
  // Campos adicionales para usuarios premium
  botAccess: { type: Boolean, default: false },
  enhancedStatistics: { type: Boolean, default: false },
  extendedProfile: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

// Esquema para redes sociales
const socialMediaSchema = new mongoose.Schema({
  twitter: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  linkedin: { type: String }
}, { _id: false });

// Esquema principal de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  isBlocked: { type: Boolean, default: false },
  role: { type: String, enum: ['basic', 'premium', 'admin'], default: 'basic' },
  // Campos adicionales para usuarios premium
  botAccess: { type: Boolean, default: false },
  enhancedStatistics: { type: Boolean, default: false },
  extendedProfile: { type: Boolean, default: false },
  socialMedia: socialMediaSchema,
  description: { type: String },
  telegramChannel: { type: String }, // Nombre o ID del canal de Telegram
  telegramBotToken: { type: String }, // Token del bot de Telegram
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

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
  username: { type: String, required: true, unique: true }, // Nombre de usuario, requerido y único
  email: { type: String, required: true, unique: true }, // Correo electrónico, requerido y único
  password: { type: String, required: true }, // Contraseña, requerida
  profilePhoto: { type: String }, // URL de la foto de perfil
  isBlocked: { type: Boolean, default: false }, // Indicador de si el usuario está bloqueado, por defecto es falso
  role: { type: String, enum: ['basic', 'premium', 'admin'], default: 'basic' }, // Rol del usuario, con valores posibles 'basic', 'premium', 'admin'. Por defecto es 'basic'
  // Campos adicionales para usuarios premium
  botAccess: { type: Boolean, default: false }, // Acceso a bot, por defecto es falso
  enhancedStatistics: { type: Boolean, default: false }, // Acceso a estadísticas mejoradas, por defecto es falso
  extendedProfile: { type: Boolean, default: false }, // Acceso a perfil extendido, por defecto es falso
  socialMedia: socialMediaSchema, // Redes sociales del usuario
  description: { type: String }, // Descripción del usuario y sus servicios
}, { timestamps: true }); // Incluye campos createdAt y updatedAt automáticamente

module.exports = mongoose.model('User', userSchema); // Exporta el modelo de usuario

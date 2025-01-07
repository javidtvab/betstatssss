const mongoose = require('mongoose');

const paidServiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceName: { type: String, required: true }, // Nombre del servicio pagado
  purchaseDate: { type: Date, default: Date.now },
  expirationDate: { type: Date, required: true } // Fecha de expiración del servicio
}, { timestamps: true });

module.exports = mongoose.model('PaidService', paidServiceSchema);

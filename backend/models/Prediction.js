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
  type: { type: String, enum: ['live', 'pre-match'], required: true }, // Tipo de pick
  isFree: { type: Boolean, default: true }, // Si el pick es gratuito o de pago
  price: { type: Number, default: 0 }, // Precio del pick si es de pago
  eventDate: { type: Date }, // Fecha del evento para pre-match
  eventTime: { type: String }, // Hora del evento para pre-match
  event: { type: String }, // Evento para pre-match
  argument: { type: String }, // Argumento para pre-match
  league: { type: String }, // Liga para pre-match (opcional)
  bookie: { type: String }, // Casa de apuestas utilizada
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);

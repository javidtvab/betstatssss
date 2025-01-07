const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);

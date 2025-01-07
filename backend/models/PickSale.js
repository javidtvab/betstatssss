const mongoose = require('mongoose');

const pickSaleSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prediction', required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PickSale', pickSaleSchema);

const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  expiryDate: { type: Date },
  isSingleUse: { type: Boolean, default: false },
  used: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);

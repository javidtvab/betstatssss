const mongoose = require('mongoose');

const userSubscriptionPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // Duration in days
  endDate: { type: Date }, // Optional end date
  telegramChannel: { type: String, required: true }, // Telegram channel for notifications
  email: { type: String, required: true }, // Email for notifications
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserSubscriptionPlan', userSubscriptionPlanSchema);

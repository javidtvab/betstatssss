const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  services: {
    botAccess: { type: Boolean, default: false },
    enhancedStatistics: { type: Boolean, default: false },
    pickVerification: { type: Boolean, default: false },
    extendedProfile: { type: Boolean, default: false },
    socialSharing: { type: Boolean, default: false },
    premiumStatistics: { type: Boolean, default: false },
    premiumPredictionForm: { type: Boolean, default: false },
    // Campos adicionales para nuevos servicios
  }
}, { timestamps: true });

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

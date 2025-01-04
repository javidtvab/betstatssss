const mongoose = require('mongoose');

const paymentGatewayConfigurationSchema = new mongoose.Schema({
  paypal: {
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    enabled: { type: Boolean, default: true }
  },
  stripe: {
    apiKey: { type: String, required: true },
    enabled: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('PaymentGatewayConfiguration', paymentGatewayConfigurationSchema);

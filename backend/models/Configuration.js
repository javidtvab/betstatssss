const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  siteTitle: { type: String, required: true },
  siteDescription: { type: String, required: true },
  primaryColor: { type: String, required: true },
  secondaryColor: { type: String, required: true },
  logoUrl: { type: String, required: true },
  footerText: { type: String, required: true },
  // Add other customization fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Configuration', configurationSchema);

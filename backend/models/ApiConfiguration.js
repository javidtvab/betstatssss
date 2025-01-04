const mongoose = require('mongoose');

const apiConfigurationSchema = new mongoose.Schema({
  apiKey: { type: String, required: true },
  endpoint: { type: String, required: true },
  enabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('ApiConfiguration', apiConfigurationSchema);

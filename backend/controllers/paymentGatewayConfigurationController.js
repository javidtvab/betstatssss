const PaymentGatewayConfiguration = require('../models/PaymentGatewayConfiguration');

// Obtener la configuración actual de las pasarelas de pago
const getPaymentGatewayConfiguration = async (req, res) => {
  try {
    const configuration = await PaymentGatewayConfiguration.findOne();
    res.status(200).json(configuration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva configuración de las pasarelas de pago
const createPaymentGatewayConfiguration = async (req, res) => {
  const { paypal, stripe } = req.body;
  const newConfiguration = new PaymentGatewayConfiguration({ paypal, stripe });

  try {
    await newConfiguration.save();
    res.status(201).json(newConfiguration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar la configuración de las pasarelas de pago
const updatePaymentGatewayConfiguration = async (req, res) => {
  const { id } = req.params;
  const { paypal, stripe } = req.body;

  try {
    const updatedConfiguration = await PaymentGatewayConfiguration.findByIdAndUpdate(id, { paypal, stripe }, { new: true });
    res.status(200).json(updatedConfiguration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar la configuración de las pasarelas de pago
const deletePaymentGatewayConfiguration = async (req, res) => {
  const { id } = req.params;

  try {
    await PaymentGatewayConfiguration.findByIdAndDelete(id);
    res.status(200).json({ message: 'Configuración de pasarelas de pago eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPaymentGatewayConfiguration, createPaymentGatewayConfiguration, updatePaymentGatewayConfiguration, deletePaymentGatewayConfiguration };

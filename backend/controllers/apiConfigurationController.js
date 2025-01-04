const ApiConfiguration = require('../models/ApiConfiguration');

// Obtener la configuración actual de la API
const getApiConfiguration = async (req, res) => {
  try {
    const configuration = await ApiConfiguration.findOne();
    res.status(200).json(configuration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva configuración de la API
const createApiConfiguration = async (req, res) => {
  const { apiKey, endpoint, enabled } = req.body;
  const newConfiguration = new ApiConfiguration({ apiKey, endpoint, enabled });

  try {
    await newConfiguration.save();
    res.status(201).json(newConfiguration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar la configuración de la API
const updateApiConfiguration = async (req, res) => {
  const { id } = req.params;
  const { apiKey, endpoint, enabled } = req.body;

  try {
    const updatedConfiguration = await ApiConfiguration.findByIdAndUpdate(id, { apiKey, endpoint, enabled }, { new: true });
    res.status(200).json(updatedConfiguration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar la configuración de la API
const deleteApiConfiguration = async (req, res) => {
  const { id } = req.params;

  try {
    await ApiConfiguration.findByIdAndDelete(id);
    res.status(200).json({ message: 'Configuración de API eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getApiConfiguration, createApiConfiguration, updateApiConfiguration, deleteApiConfiguration };

const Configuration = require('../models/Configuration');

// Obtener la configuración actual
const getConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.findOne();
    res.status(200).json(configuration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva configuración
const createConfiguration = async (req, res) => {
  const { siteTitle, siteDescription, primaryColor, secondaryColor, logoUrl, footerText } = req.body;
  const newConfiguration = new Configuration({ siteTitle, siteDescription, primaryColor, secondaryColor, logoUrl, footerText });

  try {
    await newConfiguration.save();
    res.status(201).json(newConfiguration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar la configuración
const updateConfiguration = async (req, res) => {
  const { id } = req.params;
  const { siteTitle, siteDescription, primaryColor, secondaryColor, logoUrl, footerText } = req.body;

  try {
    const updatedConfiguration = await Configuration.findByIdAndUpdate(id, { siteTitle, siteDescription, primaryColor, secondaryColor, logoUrl, footerText }, { new: true });
    res.status(200).json(updatedConfiguration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar la configuración
const deleteConfiguration = async (req, res) => {
  const { id } = req.params;

  try {
    await Configuration.findByIdAndDelete(id);
    res.status(200).json({ message: 'Configuración eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getConfiguration, createConfiguration, updateConfiguration, deleteConfiguration };

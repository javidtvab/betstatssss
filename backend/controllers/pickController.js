const Prediction = require('../models/Prediction');

// Obtener todos los picks
const getAllPicks = async (req, res) => {
  try {
    const picks = await Prediction.find().populate('userId');
    res.status(200).json(picks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar picks por descripción
const searchPicks = async (req, res) => {
  const { query } = req.params;
  try {
    const picks = await Prediction.find({ description: { $regex: query, $options: 'i' } }).populate('userId');
    res.status(200).json(picks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPicks, searchPicks };

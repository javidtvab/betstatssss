const Prediction = require('../models/Prediction');
const { uploadFile } = require('../utils/s3'); // Suponiendo que usaremos AWS S3 para almacenar las fotos

// Crear un nuevo pick
const createPick = async (req, res) => {
  const { stake, odds } = req.body;
  let photo;
  if (req.file) {
    photo = await uploadFile(req.file);
  } else {
    return res.status(400).json({ message: "La foto es obligatoria" });
  }

  if (!stake || !odds || !photo) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const newPick = new Prediction({
    userId: req.user.id,
    stake,
    odds,
    photo,
    status: 'pending', // Estado inicial del pick
    date: new Date(),
  });

  try {
    await newPick.save();
    res.status(201).json(newPick);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPick };

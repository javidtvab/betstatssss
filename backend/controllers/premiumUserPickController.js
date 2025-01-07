const Prediction = require('../models/Prediction');
const { uploadFile } = require('../utils/s3'); // Suponiendo que usaremos AWS S3 para almacenar las fotos

// Crear un nuevo pick
const createPick = async (req, res) => {
  const { type, stake, odds, isFree, price, eventDate, eventTime, event, argument, league } = req.body;
  let photo;
  if (req.file) {
    photo = await uploadFile(req.file);
  } else {
    return res.status(400).json({ message: "La foto es obligatoria" });
  }

  if (type === 'live' && (!stake || !odds || !photo)) {
    return res.status(400).json({ message: "Todos los campos son obligatorios para picks en vivo" });
  }

  if (type === 'pre-match' && (!stake || !odds || !photo || !event || !eventDate || !eventTime)) {
    return res.status(400).json({ message: "Todos los campos son obligatorios para picks pre-partido" });
  }

  const newPick = new Prediction({
    userId: req.user.id,
    type,
    stake,
    odds,
    isFree,
    price: isFree ? 0 : price,
    photo,
    eventDate: type === 'pre-match' ? eventDate : null,
    eventTime: type === 'pre-match' ? eventTime : null,
    event: type === 'pre-match' ? event : null,
    argument: type === 'pre-match' ? argument : null,
    league: type === 'pre-match' ? league : null,
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

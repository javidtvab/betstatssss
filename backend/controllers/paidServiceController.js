const PaidService = require('../models/PaidService');
const Prediction = require('../models/Prediction');
const axios = require('axios');
const { uploadFile } = require('../utils/s3'); // Suponiendo que usaremos AWS S3 para almacenar las fotos
const mongoose = require('mongoose');

// Verificar si el usuario tiene acceso al servicio pagado
const verifyAccess = async (req, res, next) => {
  try {
    const service = await PaidService.findOne({
      userId: req.user.id,
      serviceName: 'betsapi_access',
      expirationDate: { $gte: new Date() }
    });

    if (!service) {
      return res.status(403).json({ message: 'No tienes acceso a este servicio.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo pick
const createPick = async (req, res) => {
  const { type, stake, odds, isFree, price, betId } = req.body;
  let photo;
  if (req.file) {
    photo = await uploadFile(req.file);
  } else {
    return res.status(400).json({ message: "La foto es obligatoria" });
  }

  if (!stake || !odds || !photo || !betId) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    // Obtener detalles de la apuesta desde la API es.betsapi.com
    const betResponse = await axios.get(`https://api.betsapi.com/v1/bet/${betId}`, {
      params: { token: process.env.BET_API_TOKEN }
    });
    const betDetails = betResponse.data;

    const newPick = new Prediction({
      userId: req.user.id,
      type,
      stake,
      odds,
      isFree,
      price: isFree ? 0 : price,
      photo,
      date: new Date(),
      description: betDetails.description, // Descripción obtenida de la API
      sport: betDetails.sport, // Deporte obtenido de la API
      bookie: betDetails.bookie, // Casa de apuestas obtenida de la API
      eventDate: betDetails.event_date, // Fecha del evento obtenida de la API
      eventTime: betDetails.event_time, // Hora del evento obtenida de la API
      event: betDetails.event, // Evento obtenido de la API
      league: betDetails.league, // Liga obtenida de la API
    });

    await newPick.save();
    res.status(201).json(newPick);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyAccess, createPick };

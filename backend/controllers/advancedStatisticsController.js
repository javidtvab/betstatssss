const Prediction = require('../models/Prediction');
const mongoose = require('mongoose');

// Obtener estadísticas avanzadas del usuario
const getAdvancedStatistics = async (req, res) => {
  const { fromDate, toDate, sport, bookie, league, oddsRange } = req.query;
  let filters = { userId: req.user.id };

  if (fromDate || toDate) {
    filters.date = {};
    if (fromDate) filters.date.$gte = new Date(fromDate);
    if (toDate) filters.date.$lte = new Date(toDate);
  }
  if (sport) filters.sport = sport;
  if (bookie) filters.bookie = bookie;
  if (league) filters.league = league;
  if (oddsRange) {
    const [minOdds, maxOdds] = oddsRange.split('-').map(Number);
    filters.odds = { $gte: minOdds, $lte: maxOdds };
  }

  try {
    const picks = await Prediction.find(filters);

    // Establecer las estadísticas avanzadas
    const monthlyUnits = await calculateMonthlyUnits(picks);
    const sportsStats = await calculateSportsStats(picks);
    const bookiesStats = await calculateBookiesStats(picks);
    const leaguesStats = await calculateLeaguesStats(picks);
    const oddsRangeStats = await calculateOddsRangeStats(picks);

    res.status(200).json({
      picks,
      monthlyUnits,
      sportsStats,
      bookiesStats,
      leaguesStats,
      oddsRangeStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Funciones para calcular estadísticas avanzadas
const calculateMonthlyUnits = async (picks) => {
  // Implementar la lógica para calcular unidades ganadas mensualmente
};

const calculateSportsStats = async (picks) => {
  // Implementar la lógica para calcular estadísticas por deporte
};

const calculateBookiesStats = async (picks) => {
  // Implementar la lógica para calcular estadísticas por casa de apuestas
};

const calculateLeaguesStats = async (picks) => {
  // Implementar la lógica para calcular estadísticas por liga/competición
};

const calculateOddsRangeStats = async (picks) => {
  // Implementar la lógica para calcular estadísticas por rango de cuotas
};

module.exports = { getAdvancedStatistics };

const Prediction = require('../models/Prediction');

// Obtener todas las predicciones del usuario con filtros y búsqueda
const getUserPicks = async (req, res) => {
  const { status, sport, fromDate, toDate } = req.query;
  let filters = { userId: req.user.id };

  if (status) filters.status = status;
  if (sport) filters.sport = sport;
  if (fromDate || toDate) {
    filters.date = {};
    if (fromDate) filters.date.$gte = new Date(fromDate);
    if (toDate) filters.date.$lte = new Date(toDate);
  }

  try {
    const picks = await Prediction.find(filters);
    res.status(200).json(picks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener estadísticas de las predicciones del usuario
const getUserStatistics = async (req, res) => {
  try {
    const picks = await Prediction.find({ userId: req.user.id });
    const numberOfPredictions = picks.length;
    const averageStake = (picks.reduce((sum, pick) => sum + pick.stake, 0) / numberOfPredictions).toFixed(2);
    const averageOdds = (picks.reduce((sum, pick) => sum + pick.odds, 0) / numberOfPredictions).toFixed(2);
    const winPercentage = ((picks.filter(pick => pick.status === 'won').length / numberOfPredictions) * 100).toFixed(2);
    const totalUnitsWon = picks.reduce((sum, pick) => sum + pick.units, 0).toFixed(2);
    const sports = [...new Set(picks.map(pick => pick.sport))];
    const statuses = picks.reduce((acc, pick) => {
      acc[pick.status] = (acc[pick.status] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      numberOfPredictions,
      averageStake,
      averageOdds,
      winPercentage,
      totalUnitsWon,
      sports,
      statuses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserPicks, getUserStatistics };

const Prediction = require('../models/Prediction');

// Obtener el listado de picks subidos por el usuario
const getUserPicks = async (req, res) => {
  try {
    const picks = await Prediction.find({ userId: req.user.id }).select('-units');
    res.status(200).json(picks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener estadísticas básicas del usuario
const getUserStatistics = async (req, res) => {
  try {
    const picks = await Prediction.find({ userId: req.user.id });
    if (picks.length === 0) {
      return res.status(200).json({
        numberOfPredictions: 0,
        averageStake: 0,
        averageOdds: 0,
        winPercentage: 0,
        totalUnitsWon: 0,
        sports: []
      });
    }

    const numberOfPredictions = picks.length;
    const averageStake = (picks.reduce((sum, pick) => sum + pick.stake, 0) / numberOfPredictions).toFixed(2);
    const averageOdds = (picks.reduce((sum, pick) => sum + pick.odds, 0) / numberOfPredictions).toFixed(2);
    const winPercentage = ((picks.filter(pick => pick.status === 'won').length / numberOfPredictions) * 100).toFixed(2);
    const totalUnitsWon = picks.reduce((sum, pick) => sum + pick.units, 0).toFixed(2);
    const sports = [...new Set(picks.map(pick => pick.sport))];

    res.status(200).json({
      numberOfPredictions,
      averageStake,
      averageOdds,
      winPercentage,
      totalUnitsWon,
      sports
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserPicks, getUserStatistics };

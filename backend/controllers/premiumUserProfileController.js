const User = require('../models/User');
const Prediction = require('../models/Prediction');
const { uploadFile } = require('../utils/s3'); // Suponiendo que usaremos AWS S3 para almacenar las fotos

// Obtener el perfil del usuario premium
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // Obtener estadísticas del usuario
    const picks = await Prediction.find({ userId: req.user.id });
    const numberOfPredictions = picks.length;
    const averageStake = (picks.reduce((sum, pick) => sum + pick.stake, 0) / numberOfPredictions).toFixed(2);
    const averageOdds = (picks.reduce((sum, pick) => sum + pick.odds, 0) / numberOfPredictions).toFixed(2);
    const winPercentage = ((picks.filter(pick => pick.status === 'won').length / numberOfPredictions) * 100).toFixed(2);
    const totalUnitsWon = picks.reduce((sum, pick) => sum + pick.units, 0).toFixed(2);
    const sports = [...new Set(picks.map(pick => pick.sport))];

    res.status(200).json({
      user,
      statistics: {
        numberOfPredictions,
        averageStake,
        averageOdds,
        winPercentage,
        totalUnitsWon,
        sports
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el perfil del usuario premium
const updateProfile = async (req, res) => {
  const { username, socialMedia, description } = req.body;
  let profilePhoto;
  if (req.file) {
    profilePhoto = await uploadFile(req.file);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { username, socialMedia, description, profilePhoto }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };

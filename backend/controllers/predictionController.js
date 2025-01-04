const Prediction = require('../models/Prediction');

// Obtener todos los pronósticos verificados
const getVerifiedPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ status: { $ne: 'pending' } }).populate('userId');
    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verificar pronóstico
const verifyPrediction = async (req, res) => {
  const { id } = req.params;
  const { status, units } = req.body;

  try {
    const prediction = await Prediction.findById(id);

    if (!prediction) {
      return res.status(404).json({ message: 'Pronóstico no encontrado' });
    }

    // Calcular unidades según el estado
    if (units !== undefined) {
      prediction.units = units;
    } else {
      switch (status) {
        case 'won':
          prediction.units = (prediction.stake * prediction.odds) - prediction.stake;
          break;
        case 'lost':
          prediction.units = -prediction.stake;
          break;
        case 'void':
        case 'cancelled':
          prediction.units = 0;
          break;
        case 'closed':
          // Las unidades deben ser ingresadas manualmente
          break;
        default:
          return res.status(400).json({ message: 'Estado no válido' });
      }
    }

    prediction.status = status;
    await prediction.save();

    res.status(200).json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVerifiedPredictions, verifyPrediction };

const Prediction = require('../models/Prediction');

// Obtener todos los picks autoverificados
const getSelfVerifiedPicks = async (req, res) => {
  try {
    const picks = await Prediction.find({ selfVerified: true }).populate('userId');
    res.status(200).json(picks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modificar el estado de un pick autoverificado
const updateSelfVerifiedPick = async (req, res) => {
  const { id } = req.params;
  const { status, units } = req.body;

  try {
    const pick = await Prediction.findById(id);

    if (!pick) {
      return res.status(404).json({ message: 'Pick no encontrado' });
    }

    // Calcular unidades según el estado
    if (units !== undefined) {
      pick.units = units;
    } else {
      switch (status) {
        case 'won':
          pick.units = (pick.stake * pick.odds) - pick.stake;
          break;
        case 'lost':
          pick.units = -pick.stake;
          break;
        case 'void':
        case 'cancelled':
          pick.units = 0;
          break;
        case 'closed':
          // Las unidades deben ser ingresadas manualmente
          break;
        default:
          return res.status(400).json({ message: 'Estado no válido' });
      }
    }

    pick.status = status;
    await pick.save();

    res.status(200).json(pick);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSelfVerifiedPicks, updateSelfVerifiedPick };

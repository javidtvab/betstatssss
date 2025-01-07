const Subscription = require('../models/Subscription');
const PickSale = require('../models/PickSale');

// Obtener suscripciones vendidas por el usuario
const getSoldSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ sellerId: req.user.id }).populate('buyerId', 'username email');
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener picks vendidos por el usuario
const getSoldPicks = async (req, res) => {
  try {
    const pickSales = await PickSale.find({ sellerId: req.user.id }).populate('buyerId', 'username email').populate('pickId', 'description odds stake');
    res.status(200).json(pickSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSoldSubscriptions, getSoldPicks };

const UserSubscriptionPlan = require('../models/UserSubscriptionPlan');

// Obtener todos los planes de suscripción de usuarios
const getUserSubscriptionPlans = async (req, res) => {
  try {
    const plans = await UserSubscriptionPlan.find().populate('userId planId');
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo plan de suscripción de usuario
const createUserSubscriptionPlan = async (req, res) => {
  const { userId, planId, price, duration, endDate, telegramChannel, email } = req.body;
  const newPlan = new UserSubscriptionPlan({ userId, planId, price, duration, endDate, telegramChannel, email });

  try {
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un plan de suscripción de usuario
const updateUserSubscriptionPlan = async (req, res) => {
  const { id } = req.params;
  const { userId, planId, price, duration, endDate, telegramChannel, email, isActive } = req.body;

  try {
    const updatedPlan = await UserSubscriptionPlan.findByIdAndUpdate(id, { userId, planId, price, duration, endDate, telegramChannel, email, isActive }, { new: true });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un plan de suscripción de usuario
const deleteUserSubscriptionPlan = async (req, res) => {
  const { id } = req.params;

  try {
    await UserSubscriptionPlan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Plan de suscripción de usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserSubscriptionPlans, createUserSubscriptionPlan, updateUserSubscriptionPlan, deleteUserSubscriptionPlan };

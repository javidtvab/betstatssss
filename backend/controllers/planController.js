const SubscriptionPlan = require('../models/SubscriptionPlan');

// Obtener todos los planes de suscripción
const getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo plan de suscripción
const createPlan = async (req, res) => {
  const { name, description, price, services } = req.body;
  const newPlan = new SubscriptionPlan({ name, description, price, services });

  try {
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un plan de suscripción
const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, services } = req.body;

  try {
    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(id, { name, description, price, services }, { new: true });
    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un plan de suscripción
const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    await SubscriptionPlan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Plan de suscripción eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlans, createPlan, updatePlan, deletePlan };

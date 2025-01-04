const Coupon = require('../models/Coupon');

// Obtener todos los cupones
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo cupón
const createCoupon = async (req, res) => {
  const { code, discountPercentage, expiryDate, isSingleUse } = req.body;
  const newCoupon = new Coupon({ code, discountPercentage, expiryDate, isSingleUse });

  try {
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un cupón
const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const { code, discountPercentage, expiryDate, isSingleUse, used } = req.body;

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, { code, discountPercentage, expiryDate, isSingleUse, used }, { new: true });
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un cupón
const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cupón eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCoupons, createCoupon, updateCoupon, deleteCoupon };

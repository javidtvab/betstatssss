const User = require('../models/User');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { username, email, password, role, botAccess, enhancedStatistics, extendedProfile } = req.body;
  const newUser = new User({ username, email, password, role, botAccess, enhancedStatistics, extendedProfile });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role, isBlocked, botAccess, enhancedStatistics, extendedProfile } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username, email, role, isBlocked, botAccess, enhancedStatistics, extendedProfile }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };

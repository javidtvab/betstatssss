const User = require('../models/User');
const bcrypt = require('bcrypt');

// Endpoint para la configuración inicial
const initialSetup = async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar si ya existe un usuario administrador
  const existingAdmin = await User.findOne({ role: 'admin' });

  if (existingAdmin) {
    return res.status(400).json({ message: 'Ya existe un usuario administrador.' });
  }

  // Crear un nuevo usuario administrador
  const admin = new User({
    username,
    email,
    password,
    role: 'admin',
  });

  // Hash the password before saving the user
  admin.password = await bcrypt.hash(admin.password, 10);

  try {
    await admin.save();
    res.status(201).json({ message: 'Usuario administrador creado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { initialSetup };

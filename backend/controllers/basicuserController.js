const User = require('../models/basicUser');
const { uploadFile } = require('../utils/s3'); // Suponiendo que usaremos AWS S3 para almacenar las fotos de perfil

// Obtener el perfil del usuario
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el perfil del usuario
const updateProfile = async (req, res) => {
  const { nick } = req.body;
  let profilePhoto;
  if (req.file) {
    profilePhoto = await uploadFile(req.file);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { nick, profilePhoto }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };

const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/premiumUserProfileController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Rutas de perfil premium
router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('profilePhoto'), updateProfile);

module.exports = router;

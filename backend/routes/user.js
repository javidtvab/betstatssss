const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { getUserPicks, getUserStatistics } = require('../controllers/userStatisticsController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Rutas de perfil
router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('profilePhoto'), updateProfile);

// Rutas de estadísticas
router.get('/picks', auth, getUserPicks);
router.get('/statistics', auth, getUserStatistics);

module.exports = router;

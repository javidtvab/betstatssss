const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/premiumUserProfileController');
const { getUserPicks, getUserStatistics } = require('../controllers/premiumUserStatisticsController');
const { createPick } = require('../controllers/premiumUserPickController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Rutas de perfil premium
router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('profilePhoto'), updateProfile);

// Rutas de estadísticas premium
router.get('/picks', auth, getUserPicks);
router.get('/statistics', auth, getUserStatistics);

// Rutas de creación de picks
router.post('/picks', auth, upload.single('photo'), createPick);

module.exports = router;

const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { getUserPicks, getUserStatistics } = require('../controllers/userStatisticsController');
const { createPick, getPendingPicks, updatePickStatus } = require('../controllers/userPickController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Rutas de perfil
router.get('/profile', auth, getProfile);
router.put('/profile', auth, upload.single('profilePhoto'), updateProfile);

// Rutas de estadísticas
router.get('/picks', auth, getUserPicks);
router.get('/statistics', auth, getUserStatistics);

// Rutas de creación de picks
router.post('/picks', auth, upload.single('photo'), createPick);

// Rutas de verificación de picks
router.get('/picks/pending', auth, getPendingPicks);
router.put('/picks/:id/status', auth, updatePickStatus);

module.exports = router;

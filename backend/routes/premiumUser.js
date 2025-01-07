const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/premiumUserProfileController');
const { getUserPicks, getUserStatistics } = require('../controllers/premiumUserStatisticsController');
const { createPick } = require('../controllers/premiumUserPickController');
const { getSoldSubscriptions, getSoldPicks } = require('../controllers/premiumUserSalesController');
const { configureTelegram } = require('../controllers/telegramController');
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

// Rutas de ventas
router.get('/sales/subscriptions', auth, getSoldSubscriptions);
router.get('/sales/picks', auth, getSoldPicks);

// Rutas de configuración de Telegram
router.put('/configure-telegram', auth, configureTelegram);

module.exports = router;

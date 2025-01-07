const router = require('express').Router();
const { verifyAccess, createPick } = require('../controllers/paidServiceController');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Rutas de creación de picks
router.post('/create-pick', auth, verifyAccess, upload.single('photo'), createPick);

module.exports = router;

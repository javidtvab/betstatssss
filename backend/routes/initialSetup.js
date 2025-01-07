const express = require('express');
const router = express.Router();
const { initialSetup } = require('../controllers/initialSetupController');

// Ruta para la configuración inicial
router.post('/initial-setup', initialSetup);

module.exports = router;

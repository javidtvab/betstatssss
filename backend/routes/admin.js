const router = require('express').Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { getPlans, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { getSalesStatistics } = require('../controllers/statisticsController');

// Rutas de Gestión de Usuarios
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Rutas de Planes de Suscripción
router.get('/plans', getPlans);
router.post('/plans', createPlan);
router.put('/plans/:id', updatePlan);
router.delete('/plans/:id', deletePlan);

// Rutas de Estadísticas de Ventas
router.get('/sales-statistics', getSalesStatistics);

module.exports = router;

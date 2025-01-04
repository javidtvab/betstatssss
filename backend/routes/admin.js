const router = require('express').Router();
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { getPlans, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { getSalesStatistics } = require('../controllers/statisticsController');
const { getVerifiedPredictions, verifyPrediction } = require('../controllers/predictionController');
const { getUserSubscriptionPlans, createUserSubscriptionPlan, updateUserSubscriptionPlan, deleteUserSubscriptionPlan } = require('../controllers/userSubscriptionPlanController');
const { getConfiguration, createConfiguration, updateConfiguration, deleteConfiguration } = require('../controllers/configurationController');
const { getAllPicks, searchPicks } = require('../controllers/pickController');
const { getSelfVerifiedPicks, updateSelfVerifiedPick } = require('../controllers/selfVerifiedPickController');
const { getApiConfiguration, createApiConfiguration, updateApiConfiguration, deleteApiConfiguration } = require('../controllers/apiConfigurationController');
const { getPaymentGatewayConfiguration, createPaymentGatewayConfiguration, updatePaymentGatewayConfiguration, deletePaymentGatewayConfiguration } = require('../controllers/paymentGatewayConfigurationController');

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

// Rutas de Verificación de Pronósticos
router.get('/predictions/verified', getVerifiedPredictions);
router.put('/predictions/verify/:id', verifyPrediction);

// Rutas de Configuración de Planes de Suscripción de Usuarios
router.get('/user-subscription-plans', getUserSubscriptionPlans);
router.post('/user-subscription-plans', createUserSubscriptionPlan);
router.put('/user-subscription-plans/:id', updateUserSubscriptionPlan);
router.delete('/user-subscription-plans/:id', deleteUserSubscriptionPlan);

// Rutas de Configuración
router.get('/configurations', getConfiguration);
router.post('/configurations', createConfiguration);
router.put('/configurations/:id', updateConfiguration);
router.delete('/configurations/:id', deleteConfiguration);

// Rutas de Picks
router.get('/picks', getAllPicks);
router.get('/picks/search/:query', searchPicks);

// Rutas de Picks Autoverificados
router.get('/self-verified-picks', getSelfVerifiedPicks);
router.put('/self-verified-picks/:id', updateSelfVerifiedPick);

// Rutas de Configuración de API
router.get('/api-configuration', getApiConfiguration);
router.post('/api-configuration', createApiConfiguration);
router.put('/api-configuration/:id', updateApiConfiguration);
router.delete('/api-configuration/:id', deleteApiConfiguration);

// Rutas de Configuración de Pasarelas de Pago
router.get('/payment-gateway-configuration', getPaymentGatewayConfiguration);
router.post('/payment-gateway-configuration', createPaymentGatewayConfiguration);
router.put('/payment-gateway-configuration/:id', updatePaymentGatewayConfiguration);
router.delete('/payment-gateway-configuration/:id', deletePaymentGatewayConfiguration);

module.exports = router;

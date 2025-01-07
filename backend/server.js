const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas de Administración
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Ruta de Configuración Inicial
const initialSetupRoutes = require('./routes/initialSetup');
app.use('/api', initialSetupRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Conexión a MongoDB establecida exitosamente");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});

// routes/detalles-compra.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa la conexión a la base de datos

// GET /detalles-compra -> Lista todos los detalles de compra
router.get('/', (req, res) => {
  db.query('SELECT * FROM daka_shops.detallecompra;', (err, results) => {
    if (err) {
      return res.status(500).send('Error al ejecutar la consulta');
    }
    res.json(results);
  });
});

module.exports = router;

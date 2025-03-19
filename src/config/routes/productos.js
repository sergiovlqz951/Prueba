const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.query('SELECT * FROM daka_shops.productos', (err, results) => {
    if (err) {
      return res.status(500).send('Error al ejecutar la consulta');
    }
    res.json(results);
  });
});

module.exports = router;

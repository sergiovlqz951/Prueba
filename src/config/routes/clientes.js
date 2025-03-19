const express = require('express');
const router = express.Router();
const db = require('../database');
const axios = require('axios');

router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      return res.status(500).send('Error al ejecutar la consulta');
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre, direccion, telefono, email } = req.body;
  
  if (!nombre || !direccion || !telefono || !email) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  
  const query = 'INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)';
  
  db.query(query, [nombre, direccion, telefono, email], (err, results) => {
    if (err) {
      console.error('Error al insertar el cliente:', err);
      return res.status(500).send('Error al crear el cliente');
    }
    res.status(201).send('Cliente creado exitosamente');
  });
});

module.exports = router;

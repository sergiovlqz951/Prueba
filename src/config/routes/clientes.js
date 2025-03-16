// routes/clientes.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa la conexión a la base de datos

// GET /clientes -> Lista todos los clientes
router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      return res.status(500).send('Error al ejecutar la consulta');
    }
    res.json(results);
  });
});

// POST /clientes -> Inserta un nuevo cliente
router.post('/', (req, res) => {
  // Obtenemos los datos enviados en el body
  const { nombre, direccion, telefono, email } = req.body;
  
  // (Opcional) Validamos que se hayan recibido los datos necesarios
  if (!nombre || !direccion || !telefono || !email) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  
  // Definimos la consulta SQL
  const query = 'INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)';
  
  // Ejecutamos la consulta
  db.query(query, [nombre, direccion, telefono, email], (err, results) => {
    if (err) {
      console.error('Error al insertar el cliente:', err);
      return res.status(500).send('Error al crear el cliente');
    }
    res.status(201).send('Cliente creado exitosamente');
  });
});

module.exports = router;

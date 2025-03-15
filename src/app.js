// Importar las dependencias necesarias
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

// Crear una aplicación Express
const app = express();

// Configurar la conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// endpoint listar clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      res.status(500).send('Error al ejecutar la consulta');
    } else {
        res.json(results);
    }
  });
});

//endpoint listar productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM daka_shops.productos', (err, results) => {
      if (err) {
        res.status(500).send('Error al ejecutar la consulta');
      } else {
          res.json(results);
      }
    });
  });

  //endpoint ver compras
app.get('/compras', (req, res) => {
    db.query('SELECT * FROM daka_shops.compras;', (err, results) => {
      if (err) {
        res.status(500).send('Error al ejecutar la consulta');
      } else {
          res.json(results);
      }
    });
  });

//endpoint ver detalles de compra
app.get('/detalles-compra', (req, res) => {
    db.query('SELECT * FROM daka_shops.detallecompra;', (err, results) => {
      if (err) {
        res.status(500).send('Error al ejecutar la consulta');
      } else {
          res.json(results);
      }
    });
  });

 // Endpoint para insertar un nuevo cliente
    app.post('/clientes', (req, res) => {
    const { nombre, direccion, telefono, email } = req.body; // Datos enviados en la solicitud
    const query = 'INSERT INTO clientes (nombre, direccion, telefono, email) VALUES (?, ?, ?, ?)';
  
    db.query(query, [nombre, direccion, telefono, email], (err, results) => {
      if (err) {
        console.error('Error al insertar el cliente:', err);
        res.status(500).send('Error al crear el cliente');
      } else {
        res.status(201).send('Cliente creado exitosamente');
      }
    });
  });
  
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

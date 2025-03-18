require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../database');

// Función para promisificar la consulta a la base de datos
function queryDatabase(query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

// Endpoint que consulta al cliente y luego utiliza la dirección para buscar coincidencias en Mapbox
router.get('/', async (req, res) => {
  const { clienteid } = req.query;

  if (!clienteid) {
    return res.status(400).send('Por favor, proporciona un clienteid en la query');
  }

  const sql = `SELECT nombre, direccion FROM clientes WHERE clienteid = ?`;

  try {
    const results = await queryDatabase(sql, [clienteid]);

    if (results.length === 0) {
      return res.status(404).send('No se encontró ningún cliente con el clienteid proporcionado');
    }

    const cliente = results[0];
    const respuesta = {
      nombre:     cliente.nombre,
      direccion:  cliente.direccion || 'Sin dirección registrada',
      coincidencias: []
    };

    if (cliente.direccion) {
      try {
        const mapboxApiKey = process.env.MAPBOX_API_KEY;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cliente.direccion)}.json?access_token=${mapboxApiKey}`;
        const mapboxRes = await axios.get(url);
        
        // Aquí verificamos si se obtuvieron coincidencias
        if (mapboxRes.data.features && mapboxRes.data.features.length > 0) {
          respuesta.coincidencias = mapboxRes.data.features.map(feature => feature.place_name);
          console.log(respuesta)
          
        } else {
          // No se encontraron coincidencias: agregamos un mensaje informativo
          respuesta.coincidencias = [];
          respuesta.mensaje = 'No se encontraron coincidencias para la dirección consultada.';
        }
      } catch (mapErr) {
        console.error('Error al consultar la API de Mapbox:', mapErr.message);
        return res.status(500).json({ error: 'Ocurrió un error al consultar la API de Mapbox.' });
      }
    } else {
      // Si no hay dirección registrada, se puede incluir un mensaje u omitir la búsqueda en Mapbox
      respuesta.mensaje = 'El cliente no tiene una dirección registrada.';
    }

    res.json(respuesta);
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err.message);
    res.status(500).send('Error al ejecutar la consulta');
  }
});

module.exports = router;
 
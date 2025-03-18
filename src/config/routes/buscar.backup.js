// Importamos Express y configuramos el router
const express = require('express');
const router = express.Router();
const db = require('../database'); // Asegúrate de que la ruta de configuración de la base de datos es correcta

// Endpoint para buscar clientes por clienteid
router.get('/', (req, res) => {
  const { clienteid } = req.query; // Obtenemos el clienteid de la query

  if (!clienteid) {
    return res.status(400).send('Por favor, proporciona un clienteid en la query');
  }
  const query = `SELECT nombre, direccion FROM clientes WHERE clienteid = ?`;

  db.query(query, [clienteid], (err, results) => {
    if (err) {
      return res.status(500).send('Error al ejecutar la consulta');
    }
    if (results.length === 0) {
      return res.status(404).send('No se encontró ningún cliente con el clienteid proporcionado');
    }
    const cliente = results[0]; // Suponiendo que clienteid es único y devuelve solo un resultado
    const response = {
      nombre: cliente.nombre,
      direccion: cliente.direccion || 'Sin dirección registrada', // Manejo de dirección faltante
    };

    res.json(response); // Devolvemos la información del cliente
  });
});
// Exportamos el router para usarlo en otros módulos
module.exports = router;

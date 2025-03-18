require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Ruta para realizar consultas a Mapbox
router.get('/', async (req, res) => {
    const searchText = req.query.q; // Obtener el texto de búsqueda
    const mapboxApiKey = process.env.MAPBOX_API_KEY; // Clave API desde .env

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${mapboxApiKey}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data); // Enviar los resultados al cliente
    } catch (error) {
        console.error('Error al consultar la API de Mapbox:', error.message);
        res.status(500).json({ error: 'Ocurrió un error al consultar la API de Mapbox.' });
    }
});

module.exports = router;
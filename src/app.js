const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded())

const clientesRouter = require('./config/routes/clientes');
const productosRouter = require('./config/routes/productos');
const comprasRouter = require('./config/routes/compras');
const detallesCompraRouter = require('./config/routes/detalles-compra');
const buscarRouter = require('./config/routes/buscar');
const geocodeRouter = require('./config/routes/geocode')

app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);
app.use('/compras', comprasRouter);
app.use('/detalles-compra.js', detallesCompraRouter);
app.use('/buscar', buscarRouter);
app.use('/geocode', geocodeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

// Importar las dependencias necesarias
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// Crear una aplicación Express
const app = express();

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded())

const db = require('./config/database');

// Importa y utiliza el router de clientes
const clientesRouter = require('./config/routes/clientes');
const productosRouter = require('./config/routes/productos');
const comprasRouter = require('./config/routes/compras');
const detallesCompraRouter = require('./config/routes/detalles-compra');

app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);
app.use('/compras', comprasRouter);
app.use('/detalles-compra.js', detallesCompraRouter)

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

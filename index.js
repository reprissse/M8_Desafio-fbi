// Importando los módulos necesarios
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js'

// Configurando las variables de entorno
dotenv.config();

// Creando la aplicación Express
const app = express();

// Configurando el puerto
const PORT = process.env.PORT || 3015;

// Usando el router
app.use('/', router);

// Iniciando el servidor
app.listen(PORT, () => 
    console.log(`El servidor se ha levantado en el puerto en http://localhost:${PORT}`));


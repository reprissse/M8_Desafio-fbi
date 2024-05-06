// Importando los módulos necesarios
import express from 'express';
const router = express.Router();
import{ homeControl, inicioSesionControl, dashboardControl } from '../controllers/agenteController.js'

// Ruta para la página de inicio
router.get('/', homeControl);

// Ruta para el inicio de sesión
router.get('/signIn', inicioSesionControl);

// Ruta para el dashboard
router.get('/dashboard', dashboardControl);

// Exportando el router
export default router;

// Importando los módulos necesarios
import path from 'path';
import jwt from 'jsonwebtoken';
import {agents} from '../data/agentes.js'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configurando el directorio y las variables de entorno
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
const env = dotenv.config().parsed;
const secretKey = env.SECRET_KEY;

// Controlador para la página de inicio
const homeControl = (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

// Controlador para el inicio de sesión
const inicioSesionControl = (req, res) => {
    try{
        const {email, password} = req.query;
        // Buscando al agente en la base de datos
        const agent = agents.find((agent)=>{
            agent.email === email && agent.password === password;
            return agent.email === email && agent.password === password;
        });

        // Generando el token
        let token = jwt.sign({email}, secretKey, {expiresIn: "2m"});

        // Verificando si el agente existe y enviando la respuesta correspondiente
        agent 
        ? res.send(`<p> Agente autenticado, bienvenido <b>${email}</b>
        su token esta en el sessionStorage</p>

        <a href="/dashboard?token=${token}"> Ir al Dashboard </a>
        <script>
        sessionStorage.setItem('token', JSON.stringify("${token}"))
        </script>`)
        : res.send ('usuario o contraseña incorrecta')
    } catch (error) {console.log(error)}
};

// Controlador para el dashboard
const dashboardControl = (req, res) => {
    try{
        const {token} = req.query
        // Verificando el token y enviando la respuesta correspondiente
        jwt.verify(token, secretKey, (err, data) => {
            if (err) {
                res.status(401).send(`ERROR ${err.message}`)
            } else { 
                res.send(`bienvenido al dashboard ${data.email}`);
            }
        });
    } catch (error) {
        console.log(error)
    }
};

// Exportando los controladores
export {homeControl, inicioSesionControl, dashboardControl};





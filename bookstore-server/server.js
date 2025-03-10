// Importaciones
import express from 'express'
import dotenv from 'dotenv'
import { corsMiddlewares } from './middlewares/cors.js'

//TODO: add import to use DDBB

//Get enviroment variables
dotenv.config()

//TODO: Get DB connection

//Construccion de aplicacion express
const app = express()

// Add cors
app.use(corsMiddlewares())
app.use(express.json())

//Rutas
//TODO: Add BookRouters
app.get('/', (req, res) => {
  res.send('API BookStore funcionando');
});

// Puerto en el que escucha la aplicacion
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
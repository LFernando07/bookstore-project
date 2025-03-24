// Importaciones
import express from 'express'
import { corsMiddlewares } from './middlewares/cors.js'
import { createBookRouter } from './routes/book.js'
import { createAuthRouter } from './routes/auth.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import { authMiddleware } from './middlewares/authCors.js'
dotenv.config();


export const createApp = ({ bookModel, userModel }) => {
  //Construccion de aplicacion express
  const app = express()

  // Add cors
  app.use(cookieParser())
  app.use(corsMiddlewares())
  app.use(authMiddleware)

  app.use(express.json())
  app.disable('x-powered-by')

  //TODO: Add BookRouters
  app.use('/api/books', createBookRouter({ bookModel }))
  app.use('/api/auth', createAuthRouter({ userModel }))

  // Puerto en el que escucha la aplicacion
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}


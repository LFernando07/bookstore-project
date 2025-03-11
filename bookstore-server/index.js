// Importaciones
import express from 'express'
import { corsMiddlewares } from './middlewares/cors.js'
import { createBookRouter } from './routes/book.js'

export const createApp = ({ bookModel }) => {
  //Construccion de aplicacion express
  const app = express()

  // Add cors
  app.use(corsMiddlewares())
  app.use(express.json())
  app.disable('x-powered-by')

  //TODO: Add BookRouters
  app.use('/books', createBookRouter({ bookModel }))

  // Puerto en el que escucha la aplicacion
  const PORT = process.env.PORT || 1234;
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}


import cors from 'cors'

// Origins accept to access
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://bookstore.com',
  'http://localhost:5173',
  // TODO: add URL Deploy project
]

// Se reclara que los host sean de llave vacia para evitar colisionar el servidor
export const corsMiddlewares = ({ acceptedorigins = ACCEPTED_ORIGINS } = {}) => cors({
  // Permitir cookies en solicitudes frontend
  credentials: true,

  origin: (origin, callback) => {

    if (acceptedorigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by cors'))
  }
})
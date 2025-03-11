import z from 'zod' //-> npm i zod -E

// Crear un esquema de la pelicula
const bookSchema = z.object({
  title: z.string({
    invalid_type_error: 'Book title must be a string',
    required_error: 'Book title is required'
  }),
  author: z.string({
    invalid_type_error: 'Author movie must be a string',
    required_error: 'Author name is required'
  }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Descriptio about a book is required'
  }),
  price: z.number().int().min(50).max(100000),
  stock: z.number().int().min(0).max(5000),
  imageUrl: z.string().url({
    message: 'Poster must be a valid URL'
  })

})

// Para el EMScript Module no se expotar las funciones como modulos sino que se exportan de manera individual

export function validateBook(object) {
  return bookSchema.safeParse(object)
}

export function validatePartialBook(object) {
  // Si no esta un parametro del esquema no se valida
  // Si esta se valida a como esta en el esquema
  return bookSchema.partial().safeParse(object)
}

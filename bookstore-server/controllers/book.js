import { validateBook, validatePartialBook } from '../schemas/book.js'

export class BookController {
  constructor({ bookModel }) {
    this.bookModel = bookModel
  }

  getAll = async (req, res) => {
    try {
      const books = await this.bookModel.getAll()
      // Si no se encuentra el libro se retorna un 404
      if (books.length === 0)
        return res.status(404).json({ message: 'List books not found' })
      // Si se encuentra el libro se retorna un 200
      if (books) return res.status(200).json(books)

    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }

  }

  getById = async (req, res) => {
    try {
      // Extraer de la petición el id para empezar a usar el modelo Book
      const { id } = req.params
      const book = await this.bookModel.getById({ id })

      // Si no se encuentra el libro se retorna un 404
      if (!book)
        return res.status(404).json({ message: 'Book not found' })
      // Si se encuentra el libro se retorna un 200
      if (book) return res.status(200).json(book)

    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  create = async (req, res) => {
    const result = validateBook(req.body)

    try {
      // Validar que el body sea correcto

      if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newBook = await this.bookModel.create({ input: result.data })

      res.status(201).json(newBook)

    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params

      const result = await this.bookModel.delete({ id })

      if (result === false) {
        return res.status(404).json({ message: 'Book not found' })
      }

      return res.json({ message: 'Book deleted' })
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }

  }

  update = async (req, res) => {
    const result = validatePartialBook(req.body)
    try {
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const { id } = req.params
      const updateBook = await this.bookModel.update({ id, input: result.data })

      // add sentence to dictionary
      if (updateBook === false) {
        return res.status(404).json({ message: 'Book not updating' })
      }

      return res.json({ message: 'Book update', updateBook })
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }

  }
}
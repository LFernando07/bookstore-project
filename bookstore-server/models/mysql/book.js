// Modelo para mysql
// importar mysql
import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
import { validate as isUuid } from 'uuid';
import { DEFAULT_CONNECTION } from '../../config/db.js';
import { validateBook, validatePartialBook } from '../../schemas/book.js';
dotenv.config();

// String Conexion
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONNECTION
// Conexion
const pool = await mysql.createPool({
  uri: connectionString,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0        // Sin límite en la cola de solicitudes
})

export class BookModel {

  static async getAll() {
    try {
      const [book] = await pool.query(
        'SELECT BIN_TO_UUID(id),title, author, description, price, stock, imageUrl FROM book; '
      )
      return book

    } catch (error) {
      throw new Error("Error al obtener lista de libros")
    }
  }

  // Corregir la forma de obtener una id de modo que no pete la aplicacion
  static async getById({ id }) {
    try {
      // Verificar que el id sea un uuid
      if (!isUuid(id)) return false;

      const [book] = await pool.query(
        'SELECT BIN_TO_UUID(id),title, author, description, price, stock, imageUrl FROM book WHERE id = UUID_TO_BIN(?); ',
        [id]
      )

      // Validar que se obtenga un libro por lo menos 
      if (book.length === 0) return false

      return book[0]
    } catch (error) {
      throw new Error("Error al obtener el libro requerido")
    }
  }

  static async create({ input }) {
    // Fragmentar los parametros dentro del input
    const {
      title,
      author,
      description,
      price,
      stock,
      imageUrl
    } = input

    try {
      //Crear un UUID
      const [uuidResult] = await pool.query('SELECT UUID() uuid;')
      const [{ uuid }] = uuidResult

      //Insetar book
      await pool.query(
        'INSERT INTO book (id, title, author, description, price, stock, imageUrl) VALUES (UUID_TO_BIN(?),?,?,?,?,?,?) ;',
        [uuid, title, author, description, price, stock, imageUrl]
      )

      // Recuperamos la pelicula para mostrarla en JSON de salida
      const [book] = await pool.query(
        'SELECT BIN_TO_UUID(id),title, author, description, price, stock, imageUrl FROM book WHERE id = UUID_TO_BIN(?); ',
        [uuid]
      )

      return book[0]

    } catch (e) {
      throw new Error("Error al crear el libro")
      // Enviar a la traza a un servicio interno
    }
  }

  // Revisar la excepcion de error radica en el metodo de busqueda
  static async delete({ id }) {
    // Verificar que el id sea un uuid
    if (!isUuid(id)) return false;

    const book = await this.getById({ id })
    // Revisar si existe el libro
    // Si no existe no se elimina nada
    if (!book) return false

    try {
      // Si existe se elimina
      await pool.query(
        'DELETE FROM book WHERE id=UUID_TO_BIN(?);',
        [id]
      )
      // Si se elimina el libro se devuelve true
      return true

    } catch (error) {
      throw new Error("Error al eliminar el libro")
      // Enviar a la traza a un servicio interno
    }
  }

  static async update({ id, input }) {
    // Verificar que el id sea un uuid
    if (!isUuid(id)) return false;

    const book = await this.getById({ id });
    if (!book) return false

    try {
      // Creacion de diccionario de valores del input
      const fields = Object.keys(input)
      if (fields.length === 0) return false

      // Crear cuerpo de modificacion para la sentencia UPDATE
      // (No es arreglo es una cadena debido al .JOIN)
      const generateBodyClausule = fields.map(field => `${field} = ?`).join(", ")

      // Arreglo unidimensal de valores de los campos de la clausula 
      const values = fields.map(field => input[field])

      await pool.query(
        `UPDATE book SET ${generateBodyClausule} WHERE id = UUID_TO_BIN(?)`,
        [...values, id] // Pasar los valores y el ID
      )

      // Recuperar el libro pero actualizado
      const update_book = await this.getById({ id });

      return update_book
    } catch (error) {
      throw new Error("Error al actualizar el libro")
    }
  }

}
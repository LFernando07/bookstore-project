// Modelo para mysql
// importar mysql
import mysql from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config();

// TODO: Setting DefaultConnection/CloudDB
const DEFAULT_CONNECTION = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'moviesdb'
}

// String Conexion
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONNECTION

// Conexion
const connection = await mysql.createConnection(connectionString)

export class BookModel {

  static async getAll() {

    const [book] = await connection.query(
      'SELECT BIN_TO_UUID(id),title, author, description, price, stock, imageUrl FROM book; '
    )
    return book
  }

  // Corregir la forma de obtener una id de modo que no pete la aplicacion
  static async getById({ id }) {
    if (id.length != 36) return null

    const [book] = await connection.query(
      'SELECT BIN_TO_UUID(id),title, author, description, price, stock, imageUrl FROM book WHERE id = UUID_TO_BIN(?); ',
      [id]
    )

    if (book.length === 0) return null

    return book[0]
  }

  static async create({ input }) {
    const {
      title,
      author,
      description,
      price,
      stock,
      imageUrl
    } = input

    //Crear un UUID
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    //Insetar book
    try {
      await connection.query(
        'INSERT INTO movie (id,title,author,description,price,stock,imageUrl) values (UUID_TO_BIN(?),?,?,?,?,?,?) ;',
        [uuid, title, author, description, price, stock, imageUrl]
      )
    } catch (e) {
      // Puede enviar informacion sensible
      throw new Error("Error creating book")
      // Enviar a la traza a un servicio interno
      // sendLog(e)
    }

    // Recuperamos la pelicula para mostrarla en JSON de salida
    const [book] = await connection.query(
      'SELECT BIN_TO_UUID(id),title, author, description, price, stock, imageUrl FROM book WHERE id = UUID_TO_BIN(?); ',
      [uuid]
    )

    return book[0]
  }

  // Revisar la excepcion de error radica en el metodo de busqueda
  static async delete({ id }) {
    const book = await this.getById({ id });

    if (!book) return false

    await connection.query(
      'DELETE FROM movie WHERE id=UUID_TO_BIN(?);',
      id
    )

    return true

  }

  static async update({ id, input }) {
    const book = await this.getById({ id });

    if (!book) return false

    // Creacion de diccionario de valores del input
    const fields = Object.keys(input)
    if (fields.length === 0) return false

    // Crear cuerpo de modificacion para la sentencia UPDATE
    // (No es arreglo es una cadena debido al .JOIN)
    const generateBodyClausule = fields.map(field => `${field} = ?`).join(", ")

    // Arreglo unidimensal de valores de los campos de la clausula 
    const values = fields.map(field => input[field])

    await connection.query(
      `UPDATE movie SET ${generateBodyClausule} WHERE id = UUID_TO_BIN(?)`,
      [...values, id] // Pasar los valores y el ID
    )

    // Recuperar el libro pero actualizado
    const update_book = await this.getById({ id });

    return update_book
  }
}
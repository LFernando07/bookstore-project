import dotenv from 'dotenv';
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import { validate as isUuid } from 'uuid';
import { DEFAULT_CONNECTION } from '../../config/db.js';
dotenv.config();

// String Conexion
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONNECTION

// Conexion
const pool = await mysql.createPool({
  uri: connectionString,
  connectionLimit: 10, // Máximo de conexiones simultáneas
  queueLimit: 0        // Sin límite en la cola de solicitudes
})

export class UserModel {

  // Create user 
  static async create({ input }) {
    // Fragmentar los parametros dentro del input
    const {
      username,
      email,
      password
    } = input

    // Insert user
    try {
      // Get me a UUID
      const [uuidResult] = await pool.query('SELECT UUID() uuid;')
      const { uuid } = uuidResult[0]

      // Generated hash-password
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const hashedpassword = await bcrypt.hash(password, saltRounds)

      await pool.query(
        'INSERT INTO user (id, username, email, password) values (UUID_TO_BIN(?),?,?,?);',
        [uuid, username, email, hashedpassword]
      )

      // Recuperamos el user para mostrarla en JSON de salida
      const [user] = await pool.query(
        'SELECT BIN_TO_UUID(id), username, email FROM user WHERE id = UUID_TO_BIN(?);',
        [uuid]

      )
      return user[0]

    } catch (error) {
      throw new Error("Error al crear usuario")
    }
  }

  static async findByEmail(email) {
    const [user] = await pool.query(
      'SELECT BIN_TO_UUID(id) as id, username, email, password FROM user WHERE email = ?;',
      [email]
    );
    return user[0];
  }

}
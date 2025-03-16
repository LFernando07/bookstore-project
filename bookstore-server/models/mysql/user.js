import dotenv from 'dotenv';
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import { DEFAULT_CONNECTION } from '../../config/db.js';
dotenv.config();

// String Conexion
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONNECTION

// Conexion
const connection = await mysql.createConnection(connectionString)

export class UserModel {

  // Create user 
  static async create({ input }) {
    const {
      username,
      email,
      password
    } = input

    // Get me a UUID
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const { uuid } = uuidResult[0]

    // Generated hash-password
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    console.log('saltRounds:', saltRounds); // Verificar el valor de saltRounds

    const hashedpassword = await bcrypt.hash(password, saltRounds)

    // Insert user
    try {
      await connection.query(
        'INSERT INTO user (id, username, email, password) values (UUID_TO_BIN(?),?,?,?);',
        [uuid, username, email, hashedpassword]
      )
    } catch (error) {
      throw new Error("Error creating user")
    }

    // Recuperamos el user para mostrarla en JSON de salida
    const [user] = await connection.query(
      'SELECT BIN_TO_UUID(id),username, email, FROM user WHERE id = UUID_TO_BIN(?); ',
      [uuid]
    )

    return user[0]
  }

  static async findByEmail(email) {
    const [user] = await connection.query(
      'SELECT BIN_TO_UUID(id) as id, username, email, password FROM user WHERE email = ?;',
      [email]
    );
    return user[0];
  }

}
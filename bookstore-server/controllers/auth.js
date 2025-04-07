import { validateUser } from '../schemas/user.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  createUser = async (req, res) => {
    // Validar que el body sea correcto
    const result = validateUser(req.body)

    try {
      if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newUser = await this.userModel.create({ input: result.data })

      res.status(201).json(newUser)

    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userModel.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.SECRET_JWT_KEY,
        { expiresIn: '1d' }
      );

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60
      });

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  logoutUser = async (req, res) => {
    try {
      res
        .clearCookie('access_token')
        .json({ message: 'Logout successful' })

    } catch (error) {
      res.status(500).json({ message: 'Error al cerrar sesión' });

    }
  }

  // TODO: Refactor method and modified authCors.js
  profileUser = async (req, res) => {
    try {
      const { user } = req.session

      if (!user) return res.status(403).send('Access not authorized')
      res.json({ user })

    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el perfil del usuario' });

    }
  }
}
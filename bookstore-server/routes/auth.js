import { Router } from 'express'
import { AuthController } from '../controllers/auth.js';

export const createAuthRouter = ({ userModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ userModel })

  authRouter.post('/register', authController.createUser);
  authRouter.post('/login', authController.loginUser);
  authRouter.post('/logout', authController.logoutUser);
  authRouter.get('/profile', authController.profileUser);

  return authRouter
}

import { Router } from 'express'
import { UserController } from '../controllers/user.js';

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new UserController({ userModel })

  userRouter.get('/profile', userController.profileUser);

  return userRouter
}

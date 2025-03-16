import { createApp } from './index.js';
import { BookModel } from './models/mysql/book.js'
import { UserModel } from './models/mysql/user.js';

//Inyectar el modelo desde lo mas fuera posible de la aplicacion
createApp({ bookModel: BookModel, userModel: UserModel })
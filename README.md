# 📚 BookStore MERN  

🚀 **BookStore MERN** es una aplicación web de tienda de libros en línea, desarrollada con el **stack MERN** (**MongoDB, Express.js, React, Node.js**).  
Permite a los usuarios **explorar libros, autenticarse, gestionar su perfil y realizar compras** con un carrito interactivo.  

---

## 🌟 Características  
✅ **Autenticación JWT** (registro e inicio de sesión).  
✅ **Catálogo de libros** con detalles y precios.  
✅ **Carrito de compras** para gestionar productos.  
✅ **Gestión de usuario** (editar perfil).  
✅ **Backend con API REST** usando Express.js y MongoDB.  

---

## 📂 Estructura del Proyecto  

```bash
📦 bookstore-project/
 ├── 📂 bookstore-client/      # Frontend (React)
 │   ├── src/components/      # Componentes UI (Navbar, BookList, Cart, Profile)
 │   ├── src/pages/           # Páginas (Home, Cart, Profile)
 │   ├── src/index.js         # Renderización principal
 │   ├── src/App.js           # Rutas principales
 │   ├── public/index.html    # HTML base
 │   ├── package.json         # Dependencias de React
 │
 ├── 📂 bookstore-server/      # Backend (Node.js + Express.js)
 │   ├── models/              # Modelos de MongoDB (User, Book, Cart)
 │   ├── routes/              # Rutas API (auth, books, cart, users)
 │   ├── controllers/         # Controladores de lógica de negocio
 │   ├── middleware/          # Middleware de autenticación JWT
 │   ├── config/db.js         # Conexión a MongoDB
 │   ├── server.js            # Servidor Express principal
 │   ├── .env                 # Variables de entorno
 │   ├── package.json         # Dependencias del backend
 │
 ├── README.md                # Documentación del proyecto

🚀 Uso
1️⃣ Regístrate o inicia sesión.
2️⃣ Explora el catálogo de libros.
3️⃣ Agrega libros al carrito.
4️⃣ Finaliza la compra.

🛠️ Tecnologías Utilizadas
Frontend: React.js, React Router, CSS
Backend: Node.js, Express.js, Mysql
Autenticación: JWT, bcrypt.js
Gestión de estado: Context API

📌 Próximas Mejoras
🔹 Implementar pagos en línea.
🔹 Filtrar libros por categorías.
🔹 Diseño responsivo avanzado.

👨‍💻 Autor
[Burgos Perea Luis Fernando] – Desarrollador by SockEnterprice
📧 Contacto: [luis.ferburpe@hotmail.com]

import jwt from 'jsonwebtoken'

export const authMiddleware = ((req, res, next) => {
  const token = req.cookies.access_token; // 👉 Leer la cookie del request
  req.session = { user: null }

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, inicia sesión' });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.session.user = data; // 👉 Almacenar usuario en el request
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
})


import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
      req.session.user = data;
    } catch (error) {
      console.log('Invalid Token');
    }
  }

  next();
}




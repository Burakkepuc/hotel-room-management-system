import jwt from 'jsonwebtoken';
require('dotenv').config();

class Token {
  static async generateToken(checkUser) {
    return jwt.sign(
      { user_id: checkUser.id, email: checkUser.email, role: checkUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );
  }

  static async verifyToken(req, res, next) {
    try {
      const auth = req.headers['authorization'];
      if (!auth) {
        return res.status(401).json({ type: false, message: 'No authorization header provided' });
      }

      const token = auth.split(' ')[1];
      if (!token) {
        return res.status(401).json({ type: false, message: 'No token provided' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ type: false, message: 'Token has expired' });
          }
          return res.status(403).json({ type: false, message: 'Invalid token' });
        }

        req.user = decoded;
        next();
      });
    } catch (error) {
      return res.status(500).json({ type: false, message: 'Internal server error' });
    }
  }
}

export default Token;
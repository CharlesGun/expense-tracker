const jwt = require('jsonwebtoken');

const {
  ACCESS_TOKEN_KEY
} = process.env;

module.exports = {
  isLogin: (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if(!authHeader){
        const error = new Error('Authorization header is missing');
        error.statusCode = 401;
        throw error;
      }
      const token = authHeader && authHeader.split(' ');
      if(token[0] !== 'Bearer') {
        const error = new Error('Invalid token format');
        error.statusCode = 401;
        throw error;
      } 
      if (!token[1]) {
        const error = new Error('Token is required');
        error.statusCode = 401;
        throw error;
      }

      const decoded = jwt.verify(token[1], ACCESS_TOKEN_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  },
}
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const ACCESS_TOKEN_AGE = Number(process.env.ACCESS_TOKEN_AGE) || 300; // default to 5 minutes

module.exports = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn: ACCESS_TOKEN_AGE });
  },
//   generateRefreshToken: () => {
//     return crypto.randomBytes(64).toString('hex');
//   },
}

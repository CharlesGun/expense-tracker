const authRepo = require('../repositories/authentication.repository');
const userRepo = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
const tokenGenerator = require('../utils/token-generator');
const {
  hashToken
} = require('../utils/token-hash');

module.exports = {
  login: async (userData) => {
    const user = await userRepo.findByEmail(userData.email);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const valid = await bcrypt.compare(userData.password, user.password);
    if (!valid) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const accessToken = tokenGenerator.generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    // const refreshToken = tokenGenerator.generateRefreshToken();

    // const expiry_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // const hashedToken = hashToken(refreshToken);
    // await authRepo.createToken({ token: hashedToken, expiry_date, user_id: user.id });

    return {
      accessToken,
      // refreshToken
    };
  },

  // logout: async (token) => {
  //   if (!token) {
  //     const error = new Error('No token provided');
  //     error.statusCode = 400;
  //     throw error;
  //   }
  //   const hashedToken = hashToken(token);
  //   await authRepo.deleteByHashedToken(hashedToken);
  // },

  // refresh: async (token) => {
  //   if (!token) {
  //     const error = new Error('No token provided');
  //     error.statusCode = 400;
  //     throw error;
  //   }

  //   const hashedToken = hashToken(token);
  //   const record = await authRepo.findByHashedToken(hashedToken);
  //   if (!record) {
  //     const error = new Error('Invalid token');
  //     error.statusCode = 401;
  //     throw error;
  //   }

  //   if (record.expiry_date < new Date()) {
  //     const error = new Error('Token expired');
  //     error.statusCode = 401;
  //     throw error;
  //   }

  //   await authRepo.deleteById(record.id);

  //   const newRefreshToken = tokenGenerator.generateRefreshToken();
  //   const newExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //   const newHashedToken = hashToken(newRefreshToken);
  //   await authRepo.createToken({
  //     token: newHashedToken,
  //     expiry_date: newExpiryDate,
  //     user_id: record.user_id
  //   });

  //   const accessToken = tokenGenerator.generateAccessToken({
  //     id: record.user_id
  //   });

  //   return {
  //     accessToken,
  //     refreshToken: newRefreshToken
  //   };
  // },

  // validateToken: async (token, userId) => {
  //   const hashedToken = hashToken(token);
  //   const record = await authRepo.findByHashedToken(hashedToken, userId);
  //   if (!record) {
  //     throw new Error('Token not found')
  //   }

  //   if (record.expiry_date < new Date()) {
  //     throw new Error('Token expired')
  //   }

  //   return record;
  // },
}
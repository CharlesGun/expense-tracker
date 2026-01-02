const usersService = require('../services/users.service');
const authService = require('../services/authentication.service');

module.exports = {
  register: async (req, res, next) => {
    try {
      const {name, email, password} = req.body;

      await usersService.addUser({name, email, password});

      res.status(201).json({
        status: true,
        message: 'User registered successfully'
      });
      
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const {email, password} = req.body;

      const tokens = await authService.login({email, password});

      // res.cookie('refreshToken', tokens.refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'Strict',
      //   maxAge: 7 * 24 * 60 * 60 * 1000,
      //   path: '/api/auth/refresh'
      // });

      res.status(200).json({
        status: true,
        message: 'Login successful',
        data: tokens.accessToken
      });
    } catch (error) {
      next(error);
    }
  },

  // logout: async (req, res, next) => {
  //   try {
  //     await authService.logout(req.cookies.refreshToken);

  //     res.clearCookie('refreshToken', {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'Strict',
  //       path: '/api/auth/refresh'
  //     });

  //     res.status(200).json({
  //       status: true,
  //       message: 'Logout successful'
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },

  // refresh: async (req, res, next) => {
  //   try {
  //     const tokens = await authService.refresh(req.cookies.refreshToken);

  //     res.cookie('refreshToken', tokens.refreshToken, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       sameSite: 'Strict',
  //       maxAge: 7 * 24 * 60 * 60 * 1000,
  //       path: '/api/auth/refresh'
  //     });

  //     res.status(200).json({
  //       status: true,
  //       message: 'Token refreshed successfully',
  //       data: tokens.accessToken
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
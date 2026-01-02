const userRepo = require('../repositories/users.repository');
const bcrypt = require('bcrypt');

module.exports = {
  addUser: async (userData) => {
    if (await userRepo.findByEmail(userData.email)) {
      const error = new Error('Email already registered');
      error.statusCode = 409;
      throw error;
    };
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    };
    return await userRepo.create(newUser);
  },

  getUserById: async (id) => {
    return await userRepo.findById(id);
  },

  getUserByEmail: async (email) => {
    return await userRepo.findByEmail(email);
  },

  updateUserById: async (id, updatedData) => {
    if (updatedData.password) {
      updatedData.password = bcrypt.hashSync(updatedData.password, 10);
    }
    return await userRepo.updateById(id, updatedData);
  },

  deleteUserById: async (id) => {
    return await userRepo.deleteById(id);
  }
}
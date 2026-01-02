const {users} = require('../models');

module.exports = {
  create: (userData) => {
    return users.create(userData);
  },
  findById: (id) => {
    return users.findOne({ where: { id } });
  },
  findByEmail: (email) => {
    return users.findOne({ where: { email } });
  },
  updateById: (id, updatedData) => {
    return users.update(updatedData, { where: { id } });
  },
  deleteById: (id) => {
    return users.destroy({ where: { id } });
  }
}
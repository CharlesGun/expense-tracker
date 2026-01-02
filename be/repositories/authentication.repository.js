const {auth} = require('../models');

module.exports = {
  createToken: (data) => {
    return auth.create(data);
  },
  findByHashedToken: (hashedToken, userId) => {
    return auth.findOne({ where: { token: hashedToken, user_id: userId } });
  },
  deleteById: (id) => {
    return auth.destroy({ where: { id } });
  }
}
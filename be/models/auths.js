'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auths extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.auths.belongsTo(models.users, {foreignKey: 'user_id'})
    }
  }
  auths.init({
    token: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'auths',
  });
  return auths;
};
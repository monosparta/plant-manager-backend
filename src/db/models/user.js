'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Rent, { as: "Rents", foreignKey: "ID" });
    }
  }
  User.init(
    {
      ID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      Phone_Number: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Is_Default_Password: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Users",
    }
  );
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Rent, { as: "Rent", foreignKey: "ID" });
    }
  }
  Plant.init(
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Intro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Img_Path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Min_Humid: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Plants",
    }
  );
  return Plant;
};
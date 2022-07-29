'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Container, { as: "Container", foreignKey: "ID"});
      this.hasOne(models.Plant, { as: "Plant", foreignKey: "ID" });
      this.hasMany(models.State, { as: "States", foreignKey: "ID" });
      this.belongsTo(models.User, { as: "User", foreignKey: "ID" });
    }
  }
  Rent.init(
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      User_ID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "Users",
          key: "ID",
        },
      },
      Plant_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Plants",
          key: "ID",
        },
      },
      Container_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Containers",
          key: "ID",
        },
      },
      Rent_Time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Rents",
    }
  );
  return Rent;
};
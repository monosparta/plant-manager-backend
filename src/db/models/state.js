'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
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
  State.init(
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Light: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Dirt_Humid: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Update_Time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Rent_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Rents",
          key: "ID",
        },
      },
    },
    {
      sequelize,
      tableName: "States",
    }
  );
  return State;
};
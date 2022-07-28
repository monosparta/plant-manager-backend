'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      User_ID: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: "Users",
          key: "ID",
        },
      },
      Plant_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Plants",
          key: "ID",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      Container_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Containers",
          key: "ID",
        },
      },
      Rent_Time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rents');
  }
};
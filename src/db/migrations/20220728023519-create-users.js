'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      ID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      Card: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      Phone_Number: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
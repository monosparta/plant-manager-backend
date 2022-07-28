'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Plants", {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      Intro: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Img_Path: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Nickname: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      Min_Humid: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plants');
  }
};
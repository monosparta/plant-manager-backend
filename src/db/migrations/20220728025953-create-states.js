'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("States", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Light: {
        type: Sequelize.INTEGER,
      },
      Dirt_Humid: {
        type: Sequelize.INTEGER,
      },
      Update_Time: {
        type: Sequelize.DATE,
      },
      Rent_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rents",
          key: "ID",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('States');
  }
};
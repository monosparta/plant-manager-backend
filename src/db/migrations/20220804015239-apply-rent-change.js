'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(
      "Rents",
      "Plant_ID",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
    await queryInterface.changeColumn(
      "Rents",
      "Container_ID",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
    await queryInterface.renameColumn("Rents", "Rent_Time", "Register_Time");
    await queryInterface.addColumn(
      "Rents",
      "Rent_Time",
      {
        type: Sequelize.DATE,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      "Rents",
      "Get_Time",
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "Rents",
      "Deadline",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
    await queryInterface.changeColumn("Rents", "Plant_ID", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("Rents", "Container_ID", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.removeColumn("Rents", "Rent_Time");
    await queryInterface.renameColumn("Rents", "Register_Time", "Rent_Time");
    await queryInterface.removeColumn("Rents", "Get_Time");
    await queryInterface.removeColumn("Rents", "Deadline");
  }
};

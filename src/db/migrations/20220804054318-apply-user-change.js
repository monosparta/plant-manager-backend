'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('Users', 'Card');
    await queryInterface.addColumn(
      "Users",
      "Is_Default_Password",
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    );
    await queryInterface.addColumn(
      "Users",
      "Role",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.addColumn(
      "Users",
      "Card",
      {
        allowNull: false,
        type: Sequelize.STRING(10),
        defaultValue: "0000000000",
      },
      {
        after: "Password",
      }
    );
    await queryInterface.removeColumn("Users", "Is_Default_Password");
    await queryInterface.removeColumn("Users", "Role");
  }
};

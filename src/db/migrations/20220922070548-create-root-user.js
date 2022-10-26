'use strict';
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
        {
            ID: randomUUID(),
            Name: 'root',
            Email: 'root@rental.planter',
            Password: bcrypt.hashSync('root', 10),
            Is_Default_Password: true,
            Role: 1
        }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { Email: 'root@rental.planter' });
  }
};

"use strict";
const bcrypt = require('bcrypt')
const { faker } = require("@faker-js/faker");

const generateUserData = () => {
  const data = {};
  data.ID = faker.datatype.uuid();
  data.Name = faker.name.firstName();
  data.Email = faker.internet.email(data.Name);
  data.Password = bcrypt.hashSync("demo",10);
  data.Is_Default_Password = false;
  data.Role = 0;
  return data;
};

const generatePlantData = (ID) => {
  const data = {};
  data.ID = ID;
  data.Name = faker.word.noun();
  data.Intro = faker.lorem.sentence(10);
  data.Img_Path = faker.image.unsplash.nature();
  data.Nickname = faker.word.noun();
  data.Min_Humid = faker.datatype.number({ min: 0, max: 80 });
  return data;
};

const generateRentData = (ID, user,container,plant) => {
  const data = {};
  data.ID = ID;
  data.User_ID = user;
  data.Plant_ID = plant;
  data.Container_ID = container;
  data.Register_Time = faker.date.past();
  data.Rent_Time = faker.date.future(1, data.Register_Time);
  data.Get_Time = faker.date.future(1, data.Rent_Time);
  data.Deadline = 7;
  return data;
};

const generateStateData = (ID, rent) => {
  const data = {};
  data.ID = ID;
  data.Light = faker.datatype.number({ min: 0, max: 500 });
  data.Dirt_Humid = faker.datatype.float({ min: 0, max: 500,precision: 0.01 });
  data.Update_Time = faker.date.future(1, rent.Rent_Time);
  data.Rent_ID = rent.ID;
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
  */
    const users = [];
    for (let x = 1; x <= 10; ++x) {
      users.push(generateUserData());
    }
    await queryInterface.bulkInsert("Users", users);

    let containers = [];
    for (let x = 1; x <= 3; ++x) {
      containers.push({ ID: x });
    }
    await queryInterface.bulkInsert("Containers", containers);

    const plants = [];
    const rents = [];
    let plantID = 1;
    let rentID = 1;
    for (let container of containers) {
      const plant = generatePlantData(plantID++);
      plants.push(plant);
      rents.push(
          generateRentData(
            rentID++,
            users[Math.floor(Math.random() * users.length)].ID,
            container.ID,
            plant.ID
          )
        );
    }
    await queryInterface.bulkInsert("Plants", plants);
    await queryInterface.bulkInsert("Rents", rents);

    const states = []
    for (let x = 1; x <= 50; ++x) {
      states.push(
        generateStateData(x, rents[Math.floor(Math.random() * rents.length)])
      );
    }
    queryInterface.bulkInsert("States", states);

    // insert empty container
    let emptyContainers = [];
    for (let x = 4; x <= 6; ++x) {
        emptyContainers.push({ ID: x });
    }
    await queryInterface.bulkInsert('Containers', emptyContainers);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Rents", null, {});
    await queryInterface.bulkDelete("Containers", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Plants", null, {});
  },
};

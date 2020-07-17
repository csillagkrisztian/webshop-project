"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Sex Toys",
        imageUrl: "isthatlegal.jpg",
        description: "Lorem ipsum orem",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Musical Instruments",
        imageUrl: "guitar.jpg",
        description: "Lorem ipsum orem",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "From Software Games",
        imageUrl: "praisethesun.jpg",
        description: "Lorem ipsum orem",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};

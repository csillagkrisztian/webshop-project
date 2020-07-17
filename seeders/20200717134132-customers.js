"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("customers", [
      {
        firstName: "Chris",
        lastName: "Tucker",
        email: "kikiop1313@freemail.com",
        address: "prepadorovi 15",
        phone: "+3814587645",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Loriko",
        lastName: "Temen",
        email: "kikiop1313@freemail.co",
        address: "prepadorovi 11",
        phone: "+3814587642",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Solaire",
        lastName: "of Astora",
        email: "sunbro@mail.com",
        address: "heaven ave 216",
        phone: "69-69-69-69",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customers", null, {});
  },
};

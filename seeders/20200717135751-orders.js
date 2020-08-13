"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("orders", [
      {
        productId: 1,
        customerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        customerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        customerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        customerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 6,
        customerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("orders", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

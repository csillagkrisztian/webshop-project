"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "The Gentle Giant",
          price: "59.99$",
          categoryId: "1",
          imageUrl: "isthatlegal.jpg",
          description: "Lorem ipsum orem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "I Want To Be More Than Friends",
          price: "39.99$",
          categoryId: "1",
          imageUrl: "pills.jpg",
          description: "Lorem ipsum orem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Dark Souls 2 SOTFS Remastered",
          price: "79.99$",
          categoryId: "3",
          imageUrl: "ihavebeenwaiting.jpg",
          description: "Lorem ipsum orem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bloodborne Kart",
          price: "29.99$",
          categoryId: "3",
          imageUrl: "dreamscometrue.jpg",
          description: "Lorem ipsum orem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Les Paul Angel",
          price: "754.99$",
          categoryId: "2",
          imageUrl: "glorious.jpg",
          description: "Lorem ipsum orem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "A flute that has seen things",
          price: "99.99$",
          categoryId: "2",
          imageUrl: "stickyflute.jpg",
          description: "Lorem ipsum orem",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};

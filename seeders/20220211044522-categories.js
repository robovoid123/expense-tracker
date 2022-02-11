"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "salary",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "business",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "tips",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "other",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "food",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "shopping",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "household",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "medical",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};

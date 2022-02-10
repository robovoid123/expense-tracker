"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
    await queryInterface.bulkInsert(
      "records",
      [
        {
          subject: "Groceries",
          type: "expense",
          amount: 250.23,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subject: "School fee",
          type: "expense",
          amount: 62300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          subject: "Salary",
          type: "income",
          amount: 80000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          subject: "Found on the ground",
          type: "income",
          amount: 2500.23,
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
    await queryInterface.bulkDelete("records", null, {});
  },
};

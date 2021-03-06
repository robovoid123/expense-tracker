"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      "records", // name of Source model
      "categoryId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "categories", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      "records", // name of Source model
      "categoryId" // key we want to remove
    );
  },
};

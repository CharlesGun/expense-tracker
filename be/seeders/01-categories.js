'use strict';

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert('categories', [{
        name: "makanan & minuman",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "transportasi",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tabungan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "hiburan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "sedekah",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('categories', null, {});
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('libraryMembers', 'status', {
      type: Sequelize.ENUM('Active', 'Suspended', 'Banned'),
      allowNull: false,
      defaultValue: 'Active'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('libraryMembers', 'status', {
      type: Sequelize.ENUM('Active', 'Suspended', 'Banned'),
      allowNull: false
    });
  }
};

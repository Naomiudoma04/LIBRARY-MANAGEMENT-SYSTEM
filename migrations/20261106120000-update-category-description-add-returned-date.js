'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('categories', 'description', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('borrowings', 'returned_date', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('borrowings', 'returned_date');

    await queryInterface.changeColumn('categories', 'description', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  }
};

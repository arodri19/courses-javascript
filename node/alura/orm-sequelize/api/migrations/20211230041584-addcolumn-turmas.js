'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Turmas', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Turmas','deletedAt');
  }
};
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymen', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymen', 'active');
  },
};

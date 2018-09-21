'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Like', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
          name: 'likeReferenceUserId'
        },
        onDelete: 'cascade',
        allowNull: true
      },
      pictureId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Picture',
          key: 'id',
          name: 'likeReferencePictureId'
        },
        onDelete: 'cascade',
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}

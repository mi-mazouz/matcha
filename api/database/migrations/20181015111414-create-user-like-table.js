'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User like', {
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
          name: 'userLikeReferenceUserId'
        },
        onDelete: 'cascade'
      },
      likeUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
          name: 'userLikeReferenceLikedUserId'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('User like')
  }
}

'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Picture like', {
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
          name: 'pictureLikeReferenceUserId'
        },
        onDelete: 'cascade'
      },
      pictureId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Picture',
          key: 'id',
          name: 'pictureLikeReferencePictureId'
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
    return queryInterface.dropTable('Picture like')
  }
}

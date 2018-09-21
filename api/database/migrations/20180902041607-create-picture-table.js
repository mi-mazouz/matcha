module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
    .createTable('Picture', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      path: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      isProfile: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
          name: 'pictureReferenceUserId'
        },
        onDelete: 'cascade',
        allowNull: false
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
    .then(() =>
      queryInterface.addIndex('Picture', ['userId', 'isProfile'], {
        indicesType: 'UNIQUE',
        where: { isProfile: true },
        name: 'uniqueProfilePicture'
      })
    )
  },

  down: queryInterface => {
    return queryInterface.dropTable('Picture')
  }
}

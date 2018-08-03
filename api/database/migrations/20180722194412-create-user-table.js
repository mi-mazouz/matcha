module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      gender: {
        type: Sequelize.ENUM('WOMAN', 'MAN', 'INTERSEXED'),
        defaultValue: 'INTERSEXED'
      },
      sexualOrientation: {
        type: Sequelize.ENUM('WOMAN', 'MAN', 'BISEXUAL'),
        defaultValue: 'BISEXUAL'
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      emailConfirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('User')
  }
}
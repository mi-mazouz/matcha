module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
    gender: {
      type: DataTypes.ENUM('FEMALE', 'MALE', 'INTERSEXED'),
      defaultValue: 'INTERSEXED'
    },
    sexualOrientation: {
      type: DataTypes.ENUM('FEMALE', 'MALE', 'BISEXUAL'),
      defaultValue: 'BISEXUAL'
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'User'
  })

  return Model
}

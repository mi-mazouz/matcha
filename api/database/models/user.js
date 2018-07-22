module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
    gender: {
      type: DataTypes.ENUM('FEMALE', 'MALE'),
      allowNull: false
    },
    sexualOrientation: {
      type: DataTypes.ENUM('FEMALE', 'MALE', 'BISEXUAL'),
      defaultValue: 'BISEXUAL'
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
      allowNull: true
    },
    emailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'User'
  })

  return Model
}

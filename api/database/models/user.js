module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
    gender: {
      type: DataTypes.ENUM('WOMAN', 'MAN', 'INTERSEXED'),
      defaultValue: 'INTERSEXED'
    },
    sexualOrientation: {
      type: DataTypes.ENUM('WOMAN', 'MAN', 'BISEXUAL'),
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
    },
    tags: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    long: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'User'
  })

  return Model
}
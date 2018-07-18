module.exports = (matchalize, DataTypes) => (
  matchalize.define('User', {
    firstName: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false
    }
  }, { tableName: 'users' })
)
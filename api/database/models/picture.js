module.exports = (Sequelize, DataTypes) => {
  const Model = Sequelize.define(
    'Picture',
    {
      path: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      isProfile: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {
      tableName: 'Picture'
    }
  )

  Model.associate = models => {
    Model.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      as: 'userId'
    })
  }

  return Model
}

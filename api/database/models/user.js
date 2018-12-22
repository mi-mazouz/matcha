module.exports = (Sequelize, DataTypes) => {
  const Model = Sequelize.define(
    'User',
    {
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
      }
    },
    {
      tableName: 'User'
    }
  )

  Model.prototype.infosFormat = function() {
    return {
      ...this.dataValues,
      pictures: this.pictures.filter(picture => !picture.isProfile),
      profilePicture: this.pictures.find(picture => picture.isProfile)
    }
  }

  Model.associate = models => {
    Model.hasMany(models.Picture, { as: 'pictures', foreignKey: 'userId' })
  }

  return Model
}

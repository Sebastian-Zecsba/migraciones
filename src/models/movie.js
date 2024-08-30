'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movie.belongsTo(models.directors)
      movie.belongsToMany(models.genre , {through: 'moviesGenres'})
    }
  }
  movie.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    runtime: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    directorName: {
      type: DataTypes.STRING
    },
    directorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'directors',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'movie',
    timestamps: false
  });
  return movie;
};
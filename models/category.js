
'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      category.hasMany(models.book, {
        foreignKey: 'category_id',
        as: 'books'
      });
    }
  }

  category.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    Name: {
      type: DataTypes.ENUM('Thriller', 'Horror', 'Biography', 'Drama', 'Sci-Fi', 'Comedy', 'True Crime', 'Cookbooks', 'Romance'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'categories',
    timestamps: true
  });

  return category;
};

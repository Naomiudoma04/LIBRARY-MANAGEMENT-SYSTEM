
'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class borrowing extends Model {
    static associate(models) {
      borrowing.belongsTo(models.book, {
        foreignKey: 'book_id',
        as: 'book'
      });

      borrowing.belongsTo(models.libraryMember, {
        foreignKey: 'libraryMember_id',
        as: 'libraryMember'
      });
    }
  }

  borrowing.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    book_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    libraryMember_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'libraryMembers',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    status: {
      type: DataTypes.ENUM('Borrowed', 'Returned', 'Overdue'),
      allowNull: false,
    },
    borrowed_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    due_date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    returned_date: {
      allowNull: true,
      type: DataTypes.DATE
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
    modelName: 'borrowing',
    tableName: 'borrowings',
    timestamps: true
  });

  return borrowing;
};

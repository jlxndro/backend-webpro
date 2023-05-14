import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./CategoryModel.js";

const {DataTypes}= Sequelize;

const Book = db.define('book', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
      },
    },

    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
      },
    },

    publisher: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
      },
    },

    published: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: true
      },
    },

    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    image: DataTypes.STRING,
    url: DataTypes.STRING

},{
    freezeTableName: true
});

Category.hasMany(Book);

Book.belongsTo(Category, {
  foreignKey: "categoryId",
});

export default Book;

(async () => {
  await db.sync();
})();
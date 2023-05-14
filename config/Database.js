import { Sequelize } from "sequelize";

const db = new Sequelize('db_book', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
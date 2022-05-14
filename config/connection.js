const Seqelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequalixe = new Seqelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Seqelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host:'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize
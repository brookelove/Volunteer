const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/connection");

class Opportunity extends Model {}

Opportunity.init ({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    lon: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    volunteersNeeded: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize
});

module.exports = Opportunity;
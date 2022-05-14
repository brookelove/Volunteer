const {Model, DataTypes} = require('sequelize');
const sequelize = requre('../cofing/connection');
const bcrypt = requre("bcrypt");

class Volunteer extends Model {}

Volunteer.init({
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            // length of the password must be at least 8
            len:[8]
        }
    }
}, {
    hooks: {
        // to encrypt password when volunteer logs in 
        beforeCreate:userObj => {
            userObj.password = bcrypt.hashSync(userObj.password,5);
            return userObj
        }
    },
    sequelize
})

//export the model to be used later 
model.exports = Volunteer
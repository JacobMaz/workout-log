const {DataTypes} = require('sequelize');
const db = require('../db');

const UserInfo = db.define('userInfo', {
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isBefore: '2005-01-01'
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 110
        }
    },
    heightInInches: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weightInPounds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    goal: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = UserInfo;
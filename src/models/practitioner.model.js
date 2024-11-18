const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model = require('../config/model');


const Practitiner = sequelize.define(model.PRACTITIONER, {
    practitiner_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    practitiner_middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    practitiner_last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = Practitiner;
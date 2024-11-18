const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model = require('../config/model');

const Clinic = sequelize.define(model.CLINIC, {
    clinic_name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    timestamps: true
})
module.exports = Clinic;
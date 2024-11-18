const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model = require('../config/model');


const Location = sequelize.define(model.LOCATION, {
    location_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
})
module.exports = Location;
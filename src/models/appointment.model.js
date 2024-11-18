const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model  = require('../config/model');

const Appointment = sequelize.define(model.APPOINTMENT, {
    appointment_start_date: {
        type: DataTypes.DATEONLY,
        allowNull:false,
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    parctitioner_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
});

module.exports = Appointment;
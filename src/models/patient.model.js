const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model = require('../config/model');


const Patient = sequelize.define(model.PATIENT, {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    practitioner_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    }
}, {
    tableName: 'patient',
    timestamps:true
});

module.exports = Patient;
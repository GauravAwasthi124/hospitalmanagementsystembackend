const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model = require('../config/model');

const GlobalType = sequelize.define(model.GLOBALTYPE, {
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull:false
    },
    globaltypecategorycode: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
});
module.exports = GlobalType;
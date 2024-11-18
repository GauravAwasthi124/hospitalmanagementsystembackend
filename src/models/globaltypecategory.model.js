const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model = require('../config/model');

const GlobalTypeCategory = sequelize.define(model.GLOBALTYPECATEGORY, {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = GlobalTypeCategory;
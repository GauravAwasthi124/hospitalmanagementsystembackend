const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const tokenType = require('../config/tokens');
const model = require('../config/model');

const Token = sequelize.define(model.TOKEN,{
    token: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    type:{
        type: DataTypes.ENUM(tokenType.REFRESH),
        allowNull:false
    },
    expires: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}); 

module.exports = Token;
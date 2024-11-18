const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const model = require('../config/model');
const bcrypt = require('bcrypt');

const User = sequelize.define(model.USER, {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clinic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_role: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,    
        defaultValue: 1
    }
});

// Adding a beforeCreate hook to hash the password
User.beforeCreate(async (user) => {
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
        throw new Error('Could not create user. Please try again.');
    }
});

// Adding a beforeUpdate hook to hash the password if it has changed
User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        } catch (error) {
            throw new Error('Could not update user. Please try again.');
        }
    }
});
module.exports = User;
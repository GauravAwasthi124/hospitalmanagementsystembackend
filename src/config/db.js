const { Sequelize, Transaction } = require('sequelize');
const { createNamespace } = require('cls-hooked');
const config = require('./config');
const model = require('../models');
const namespace = createNamespace('my-namespace');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(
    config.sequelize.database,
    config.sequelize.username,
    config.sequelize.password,
    {
        host: config.sequelize.host,
        port: config.sequelize.port,
        dialect: config.sequelize.dialect,
        logging: config.sequelize.logging,
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    },
);

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connect();

module.exports = sequelize;

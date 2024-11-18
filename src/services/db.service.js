// services/db.service.js

const db = require('../models');

/**
 * Get a single record based on query filters
 * @param {string} modelName
 * @param {object} query
 * @returns {Promise<object|null>}
 */
const getOne = async (modelName, query) => {
    try {
        const model = db[modelName];
        if (!model) throw new Error(`Model ${modelName} not found`);
        if (!query || !query.where) throw new Error('Query must include a "where" condition');

        const result = await model.findOne(query);
        return result;
    } catch (error) {
        console.error(`Error in getOne: ${error.message}`);
        throw error;
    }
};


/**
 * Get one record by its ID
 * @param {string} modelName
 * @param {number|string} id
 * @returns {Promise<object|null>}
 */
const getOneByID = async ({ modelName, id }) => {
    try {
        const model = db[modelName];
        if (!model) throw new Error(`Model ${modelName} not found`);

        const result = await model.findByPk(id);
        return result;
    } catch (error) {
        console.error(`Error in getOneByID: ${error.message}`);
        throw error;
    }
};

/**
 * Create a new record in the specified model
 * @param {string} modelName
 * @param {object} data
 * @returns {Promise<object>}
 */
const createOne = async ({ modelName, data }) => {
    try {
        const model = db[modelName];
        if (!model) throw new Error(`Model ${modelName} not found`);

        const result = await model.create(data);
        return result;
    } catch (error) {
        console.error(`Error in createOne: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getOne,
    getOneByID,
    createOne,
};


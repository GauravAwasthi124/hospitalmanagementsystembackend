const { model } = require('mongoose');
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

/**
 * Update a record by its ID
 * @param {string} modelName
 * @param {number|string} id
 * @param {object} data
 * @returns {Promise<object|null>}
 */
const updateOneByID = async ({ modelName, id, data }) => {
    try {
        const model = db[modelName];
        if (!model) throw new Error(`Model ${modelName} not found`);

        const record = await model.findByPk(id);
        if (!record) throw new Error(`Record with ID ${id} not found`);

        const updatedRecord = await record.update(data);
        return updatedRecord;
    } catch (error) {
        console.error(`Error in updateOneByID: ${error.message}`);
        throw error;
    }
};

/**
 * Delete a record by its ID
 * @param {string} modelName
 * @param {number|string} id
 * @returns {Promise<boolean>}
 */
const deleteOneByID = async ({ modelName, id }) => {
    try {
        const model = db[modelName];
        if (!model) throw new Error(`Model ${modelName} not found`);

        const record = await model.findByPk(id);
        if (!record) throw new Error(`Record with ID ${id} not found`);

        await record.destroy();
        return true;
    } catch (error) {
        console.error(`Error in deleteOneByID: ${error.message}`);
        throw error;
    }
};

/**
 * Get all records with optional filters
 * @param {string} modelName
 * @param {object} query
 * @returns {Promise<object[]>}
 */
const getAll = async (modelName, query = {}) => {
    try {
        const model = db[modelName];
        if (!model) throw new Error(`Model ${modelName} not found`);

        const results = await model.findAll(query);
        return results;
    } catch (error) {
        console.error(`Error in getAll: ${error.message}`);
        throw error;
    }
};

module.exports = {
    getOne,
    getOneByID,
    createOne,
    updateOneByID,
    deleteOneByID,
    getAll,
};

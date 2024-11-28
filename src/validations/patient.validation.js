const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPatient = {
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        middle_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone_number: Joi.number().required(),
        date_of_birth: Joi.date(),
        clinic_id: Joi.number().required(),
        practitioner_id: Joi.number().required(),
        email: Joi.string().required().email(),
        user_id: Joi.number().required(),
    })
};

const getPatient = {
    query: Joi.object().keys({
        first_name: Joi.string(),
        middle_name: Joi.string(),
        last_name: Joi.string(),
        phone_number: Joi.number(),
        date_of_birth: Joi.date(),
        clinic_id: Joi.number(),
        practitioner_id: Joi.number(),  
        email: Joi.string(),
        user_id: Joi.number(),
        page: Joi.number().integer().min(1).default(1).optional(),
        limit: Joi.number().integer().min(1).max(100).default(10).optional(),
    }),
};
const getPatientbyid = {
    params: Joi.object().keys({
        id: Joi.number()
    }),
    query: Joi.object().keys({
        first_name: Joi.string(),
        middle_name: Joi.string(),
        last_name: Joi.string(),
        phone_number: Joi.number(),
        date_of_birth: Joi.date(),
        clinic_id: Joi.number(),
        practitioner_id: Joi.number(),
        email: Joi.string(),
        user_id: Joi.number(),
    }),
};
const updatePatient = {
    params: Joi.object().keys({
        id: Joi.number()
    }),
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        middle_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone_number: Joi.number().required(),
        date_of_birth: Joi.date(),
        clinic_id: Joi.number().required(),
        practitioner_id: Joi.number().required(),
    })
    .min(1),
};

const deletePatient = {
    params: Joi.object().keys({
        id: Joi.number()
    }),
};
module.exports = {
    createPatient,
    getPatient,
    getPatientbyid,
    updatePatient,
    deletePatient
}

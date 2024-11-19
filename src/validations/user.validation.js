const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

// const createUser = {
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().custom(password),
//     name: Joi.string().required(),
//     role: Joi.string().required().valid('user', 'admin'),
//   }),
// };

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    clinic_id: Joi.number().required(),
    user_role: Joi.array().required(),
    status:Joi.number().required(),
  }),
};


const getUsers = {
  query: Joi.object().keys({
    email: Joi.string(),
    clinic_id: Joi.number().integer(),
    user_role: Joi.array(),
    status: Joi.number().integer(),
  }),
}; 

const getUser = {
  params: Joi.object().keys({
    // id: Joi.number().custom(objectId),
    id: Joi.number()
  }),
  query: Joi.object().keys({
    email: Joi.string(),
    clinic_id: Joi.number().integer(),
    user_role: Joi.array(),
    status: Joi.number().integer(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string(),
      clinic_id: Joi.number().integer(),
      user_role: Joi.array(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    // id: Joi.number().custom(objectId),
    id: Joi.number()
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};


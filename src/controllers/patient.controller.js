const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dbService } = require('../services');
const jwt = require('jsonwebtoken');

const createPatient = catchAsync(async (req, res) => {
    const patient = await dbService.createOne({ modelName: 'Patient', data: req.body });
    res.status(httpStatus.CREATED).send(patient);
});

const getAllPatient = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['first_name', 'middle_name', 'last_name', 'date_of_birth', 'phone_number', 'clinic_id', 'practitioner_id', 'email', 'user_id']);
    const options = pick(req.query, ['shortBy']);
    const result = await dbService.getAll('Patient', ({ filter, options }));
    console.log(result);
    res.send(result);
})

const getPatient = catchAsync(async (req, res) => {
    const patient = await dbService.getOneByID({ modelName: 'Patient', id: req.params.id });
    if (!patient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
    }
    res.send(patient);
})

module.exports = {
    createPatient,
    getAllPatient,
    getPatient
};

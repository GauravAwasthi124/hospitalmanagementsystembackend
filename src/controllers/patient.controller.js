const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { patientService } = require('../services');
const jwt = require('jsonwebtoken');

const createPatient = catchAsync(async (req, res) => {
    const patient = await patientService.createPatient(req.body);
    res.status(httpStatus.CREATED).send(patient);
});

const getAllPatient = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['first_name', 'middle_name', 'last_name', 'date_of_birth', 'phone_number', 'clinic_id', 'practitioner_id', 'email', 'user_id']);
    const options = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 10,
        filter,
    };

    const result = await patientService.queryPatient(options);
    res.send(result);
});


const getPatient = catchAsync(async (req, res) => {
    const id = req.params.id;
    const patient = await patientService.getPatientById(id);
    if (!patient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
    }
    res.send(patient);
}) 

const updatePatient = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updatedata = req.body;
    const patient = await patientService.updatePatientById({ id, 'updateBody': updatedata });
    res.send(patient);
})  

const deletePatient = catchAsync(async (req, res) => {
    const id = req.params.id;
    await patientService.deletePatientById({ id })
    res.status(httpStatus.NO_CONTENT).send();
})



module.exports = {
    createPatient,
    getAllPatient,
    getPatient,
    updatePatient,
    deletePatient
};

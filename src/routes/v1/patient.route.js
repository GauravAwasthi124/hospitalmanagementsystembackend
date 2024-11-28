const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const patientValidation = require('../../validations/patient.validation');
const patientController = require('../../controllers/patient.controller');
const tokenValidation = require('../../middlewares/verifytoken');
const { token } = require('morgan');
const router = express.Router();

router
    .route('/')
    .post(auth('manageUsers'), validate(patientValidation.createPatient), patientController.createPatient)
    .get(auth('getUsers'),validate(patientValidation.getPatient),patientController.getAllPatient)
router
    .route('/:id')
    .get(auth('getUsers'), validate(patientValidation.getPatientbyid), patientController.getPatient)
    .patch(auth('manageUsers'),validate(patientValidation.updatePatient),patientController.updatePatient)
    .delete(auth('manageUsers'),validate(patientValidation.deletePatient),patientController.deletePatient)
module.exports = router;
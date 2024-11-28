const httpStatus = require('http-status');
const db = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Patient>}
 */

const createPatient = async (patientBody) => {
    return await db.Patient.create(patientBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPatient = async ({ page, limit, filter }) => {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Query the patients with pagination
    const { count, rows: patients } = await db.Patient.findAndCountAll({
        where: filter, // Apply filters if any
        limit, // Limit the number of results
        offset, // Skip the appropriate number of rows
        attributes: ['id', 'first_name', 'middle_name', 'last_name', 'date_of_birth', 'phone_number'],
        include: [
            {
                model: db.Clinic,
                as: 'clinic',
                attributes: ['clinic_name'],
            },
            {
                model: db.Practitioner,
                as: 'practitioner',
                attributes: ['practitiner_first_name', 'practitiner_middle_name', 'practitiner_last_name'],
            },
        ],
    });

    const totalPages = Math.ceil(count / limit);

    return {
        totalItems: count,
        patients,
        totalPages,
        currentPage: page,
    };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getPatientById = async (id) => {
    return db.Patient.findByPk(id,
        {
            attributes: ['id', 'first_name', 'middle_name', 'last_name', 'date_of_birth', 'phone_number'],
            include: [
                {
                    model: db.Clinic,
                    as: 'clinic',
                    attributes: ['clinic_name']
                },
                {
                    model: db.Practitioner,
                    as: 'practitioner',
                    attributes: ['practitiner_first_name', 'practitiner_middle_name', 'practitiner_last_name']
                }
            ]
        }
    );
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updatePatientById = async ({id, updateBody}) => {
    const patient = await getPatientById(id);
    if (!patient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
    }
    Object.assign(patient, updateBody);
    console.log(patient);
    await patient.save();
    return patient;
    
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deletePatientById = async ({id}) => {
    const patient = await getPatientById(id);
    if (!patient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
    } else {
        await patient.destroy();
    }
    return patient;
}

module.exports = {
    createPatient,
    queryPatient,
    getPatientById,
    updatePatientById,
    deletePatientById
}

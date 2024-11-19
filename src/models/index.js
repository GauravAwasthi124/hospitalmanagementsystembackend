const Appointment = require("./appointment.model");
const Clinic = require("./clinic.model");
const Location = require("./location.model");
const User = require("./user.model");
const Patient = require("./patient.model");
const Practitioner = require("./practitioner.model");
const ClinicAdmin = require('./clinicadmin.model');
const GlobalTypeCategory = require('./globaltypecategory.model');
const GlobalType = require('./global_type.model');
const Token = require('./token.model');

const db = {
    Appointment: Appointment,
    ClinicAdmin: ClinicAdmin,
    Clinic: Clinic,
    Location: Location,
    Patient: Patient,
    User: User,
    Practitioner: Practitioner,
    GlobalTypeCategory: GlobalTypeCategory,
    GlobalType: GlobalType,
    Token:Token
    
}

//association
//Clinic for all

//users
db.Clinic.hasMany(db.User, { foreignKey: 'clinic_id', onDelete: 'CASCADE',as: 'user'});
db.User.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });


//patient
db.Clinic.hasMany(db.Patient, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as: 'patient' });
db.Patient.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as: 'clinic'});
db.Practitioner.hasMany(db.Patient, { foreignKey: 'practitioner_id', onDelete: 'CASCADE' });
db.Patient.belongsTo(db.Practitioner, { foreignKey: 'practitioner_id', onDelete: 'CASCADE' });
db.User.hasMany(db.Patient, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'user' });
db.Patient.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'CASCADE', as: 'user' })

//practitioner
db.Clinic.hasMany(db.Practitioner, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as: 'practitioner' });
db.Practitioner.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as:'clinic' });


//location
db.Clinic.hasMany(db.Location, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as: 'location' });
db.Location.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as:'clinic' });


//appointment
db.Clinic.hasMany(db.Appointment, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as: 'appointment'});
db.Appointment.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE' , as:'clinic' });
db.Practitioner.hasMany(db.Appointment, { foreignKey: 'practitioner_id', onDelete: 'CASCADE' });
db.Appointment.belongsTo(db.Practitioner, { foreignKey: 'practitioner_id', onDelete: 'CASCADE' });
db.Patient.hasMany(db.Appointment, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
db.Appointment.belongsTo(db.Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
db.Location.hasMany(db.Appointment, { foreignKey: 'location_id', onDelete: 'CASCADE' });
db.Appointment.belongsTo(db.Location, { foreignKey: 'location_id', onDelete: 'CASCADE' });


//clinic admin
db.Clinic.hasMany(db.ClinicAdmin, { foreignKey: 'clinic_id', onDelete: 'CASCADE', as: 'clinicadmin' });
db.ClinicAdmin.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });
db.User.hasMany(db.ClinicAdmin, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.ClinicAdmin.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });


// GlobalTypeCategory
db.Clinic.hasMany(db.GlobalTypeCategory, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });
db.GlobalTypeCategory.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });


//global type
db.Clinic.hasMany(db.GlobalType, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });
db.GlobalType.belongsTo(db.Clinic, { foreignKey: 'clinic_id', onDelete: 'CASCADE' });
db.GlobalTypeCategory.hasMany(db.GlobalType, { foreignKey: 'globaltypecategorycode', sourceKey: 'code', onDelete: 'CASCADE' });
db.GlobalType.belongsTo(db.GlobalTypeCategory, { foreignKey: 'globaltypecategorycode', targetKey: 'code', onDelete: 'CASCADE' });



//token type
db.User.hasMany(db.Token, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.Token.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'CASCADE' })

module.exports = db
const user_data = require('./master_data/user_data');
const clinic_data = require('./master_data/clinic_data');
const location_data = require('./master_data/location_data');
const practitioner_data = require('./master_data/practitioner_data');
const clinicadmin_data = require('./master_data/clinicadmin_data');
const db = require('../src/models/');
const sequlizier = require('../src/config/db');

async function seeddatabase() {
 try {
     await sequlizier.sync({ force: true });
     await db.Clinic.bulkCreate(clinic_data);
     await db.User.bulkCreate(user_data , {individualHooks:true});
     await db.Location.bulkCreate(location_data);
     await db.Practitioner.bulkCreate(practitioner_data);
     await db.ClinicAdmin.bulkCreate(clinicadmin_data);
     console.log('done');
     
 } catch (error) {
     console.log(error);
 }   
}
seeddatabase();

 
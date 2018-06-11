const mongoose = require('mongoose');
mongoose.Promise = Promise;
const db = mongoose.connection;

const dbName = 'internship_prep_sessions';
// const dbName = 'student_organiser_test';


db.on('open', () => { console.log('Successful connection to MongoDB') });
mongoose.connect(`mongodb://localhost/${dbName}`);

module.exports = mongoose;
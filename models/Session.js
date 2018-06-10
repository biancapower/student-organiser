const db = require('./db');
const SessionSchema = db.Schema({
    name: String,
    date: Date,
    groups: [[String]],
});

const Session = db.model('Session', SessionSchema);

module.exports = Session;
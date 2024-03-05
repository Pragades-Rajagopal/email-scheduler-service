const sqlite = require('sqlite3').verbose();
const path = require('path');

var dbPath = path.resolve(__dirname, '../../', 'db.sqlite');

let db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error connecting to database: ", err.message);
    } else {
        console.log("Connected to database");
    }
});

module.exports = db;
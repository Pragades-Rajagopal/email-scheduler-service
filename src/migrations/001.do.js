const database = require('../database/connector');

(() => {
    console.log('Migrating 001.do.js ...');
    database.run(
        `CREATE TABLE IF NOT EXISTS scheduler (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            send_to TEXT NOT NULL,
            _date DATE NOT NULL,
            _time TEXT NOT NULL,
            created_on DATETIME NOT NULL
        );`
    );
})();
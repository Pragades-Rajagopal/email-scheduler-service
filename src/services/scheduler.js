const db = require('../database/connector');

module.exports = {
    /**
     * Method to save data to scheduler table
     * @param {object} data 
     * @returns {string}
     */
    saveSchedule: (data) => {
        const sql = `
                INSERT INTO scheduler (_date, _time, created_on)
                VALUES (?, ?, ?)
            `;
        return new Promise((resolve, reject) => {
            db.run(sql, [data.date, data.time, data.created_on], (err) => {
                if (err) {
                    reject('error saving schedule');
                } else {
                    resolve('schedule saved');
                }
            });
        });
    }
}
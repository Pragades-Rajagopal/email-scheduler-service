const db = require('../database/connector');

module.exports = {
    /**
     * Save data to scheduler table
     * @param {object} data 
     * @returns {string}
     */
    saveSchedule: (data) => {
        const sql = `INSERT INTO scheduler (_date, _time, send_to, created_on)
                    VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db.run(sql, [data.date, data.time, data.sendTo, data.createdOn], (err) => {
                if (err) {
                    console.log(err);
                    reject('error while saving schedule');
                } else {
                    resolve('schedule saved');
                }
            });
        });
    },

    /**
     * Get a schedule info for an id
     * 
     * Get all schedule info
     * @param {number} id [optional]
     * @returns 
     */
    getScheduleInfo: (id) => {
        const sql = id
            ? `SELECT * FROM scheduler WHERE id = ${id}`
            : `SELECT * FROM scheduler`
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, data) => {
                if (err) {
                    reject('error while fetching schedule')
                } else {
                    resolve(data)
                }
            })
        })
    }
}
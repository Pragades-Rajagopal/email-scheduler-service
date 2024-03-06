const path = require('path');
require('dotenv').config({
    path: path.resolve('../../.env'),
});
const nodemailer = require('nodemailer');
const fs = require('fs');
const moment = require('moment');
const db = require('../database/connector');

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});

module.exports = {
    /**
     * Triggers email
     * @param {string} email 
     */
    triggerEmail: async (email) => {
        const mailInfo = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Automated Mail',
            html: getTemplate('template')
        })
        console.log(mailInfo);
    },

    /**
     * Get all schedules for today and current time
     * @returns {object} 
     */
    getSchedules: () => {
        const today = moment().utcOffset("+05:30").format("YYYY-MM-DD")
        const currentTime = moment().utcOffset("+05:30").format("HH:mm")
        console.log(currentTime);
        const sql = `
            SELECT send_to FROM scheduler
            WHERE _date = ? AND _time = ?
        `;
        return new Promise((resolve, reject) => {
            db.all(sql, [today, currentTime], (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            });
        })
    }
}

/**
 * Returns file for the given HTML template
 * @param {string} template 
 * @returns HTML file
 */
const getTemplate = (template) => {
    const templatePath = path.resolve(__dirname, '../../', 'public/views', template + '.html');
    const file = fs.readFileSync(templatePath, { encoding: 'utf-8' });
    return file;
}
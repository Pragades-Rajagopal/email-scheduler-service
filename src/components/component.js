const moment = require('moment');
const schedulerService = require('../services/scheduler')

module.exports = {
    /**
     * Sample method
     * @param {*} request 
     * @param {*} response 
     */
    createSchedule: async (request, response) => {
        try {
            const body = request.body;
            //
        } catch (error) {
            return response.statusCode(500).json({
                statuscode: 500,
                message: 'Internal error while saving the schedule'
            })
        }
    }
}
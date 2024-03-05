const moment = require('moment');
const schedulerService = require('../services/scheduler');
const IST = moment().utcOffset("+05:30");

module.exports = {
    /**
     * Create a schedule
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response 
     */
    createSchedule: async (request, response) => {
        try {
            const body = request.body;
            const checkDate = moment(body.date).isBefore(IST, "day");
            const checkTime = moment(body.time, 'hh:mm').isBefore(IST);
            if (checkDate) {
                return response.status(400).json({
                    statuscode: 400,
                    message: 'Date should be future'
                });
            }
            if (checkTime) {
                return response.status(400).json({
                    statuscode: 400,
                    message: 'Time should be future'
                });
            }
            body.createdOn = IST.format("YYYY/MM/DD hh:mm:ss");
            await schedulerService.saveSchedule(body);
            return response.status(201).json({
                statuscode: 201,
                message: 'Schedule saved successfully'
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                statuscode: 500,
                message: 'Internal error while saving the schedule'
            });
        }
    },

    /**
     * Get a schedule by ID
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    getScheduleById: async (request, response) => {
        try {
            const id = request.params.id;
            const data = await schedulerService.getScheduleInfo(id);
            if (data && data.length === 0) {
                return response.status(404).json({
                    statuscode: 404,
                    message: 'Schedule not found for this ID',
                    data: []
                });
            }
            return response.status(200).json({
                statuscode: 200,
                message: 'Schedule fetched successfully',
                data: data
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                statuscode: 500,
                message: 'Internal error while fetching the schedule'
            });
        }
    },


    /**
     * Get all schedules
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    getAllSchedules: async (request, response) => {
        try {
            const data = await schedulerService.getScheduleInfo();
            if (data && data.length === 0) {
                return response.status(404).json({
                    statuscode: 404,
                    message: 'Schedule info not found',
                    data: []
                });
            }
            return response.status(200).json({
                statuscode: 200,
                message: 'Schedules fetched successfully',
                data: data
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                statuscode: 500,
                message: 'Internal error while fetching the schedule'
            });
        }
    }
}
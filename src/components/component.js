const moment = require('moment');
const { validationResult } = require('express-validator');
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
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }
            const body = request.body;
            const checkDate = dateValidator(body.date);
            const checkTime = timeValidator(body.time);
            if (checkDate) {
                return response.status(400).json({
                    statuscode: 400,
                    message: 'date should be future date'
                });
            }
            if (checkTime) {
                return response.status(400).json({
                    statuscode: 400,
                    message: 'time should be future time'
                });
            }
            body.createdOn = IST.format("YYYY/MM/DD HH:mm:ss");
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
    },

    /**
     * Update a schedule
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    updateSchedule: async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }
            const id = request.params.id;
            const body = request.body;
            /**
             * Check if the schedule exists for the given schedule id
             */
            const checkData = await schedulerService.getScheduleInfo(id);
            if (checkData && checkData.length === 0) {
                return response.status(404).json({
                    statuscode: 404,
                    message: 'Schedule not found for this ID'
                });
            }
            const checkDate = dateValidator(body.date);
            const checkTime = timeValidator(body.time);
            if (checkDate) {
                return response.status(400).json({
                    statuscode: 400,
                    message: 'date should be future date'
                });
            }
            if (checkTime) {
                return response.status(400).json({
                    statuscode: 400,
                    message: 'time should be future time'
                });
            }
            await schedulerService.updateSchedule(id, body);
            return response.status(200).json({
                statuscode: 200,
                message: 'Schedule updated successfully'
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                statuscode: 500,
                message: 'Internal error while updating the schedule'
            });
        }
    },

    /**
     * Deletes a schedule
     * @param {*} request 
     * @param {*} response 
     * @returns {object} response
     */
    deleteSchedule: async (request, response) => {
        try {
            const id = request.params.id;
            /**
             * Check if the schedule exists for the given schedule id
             */
            const checkData = await schedulerService.getScheduleInfo(id);
            if (checkData && checkData.length === 0) {
                return response.status(404).json({
                    statuscode: 404,
                    message: 'Schedule not found for this ID'
                });
            }
            await schedulerService.deleteSchedule(id);
            return response.status(200).json({
                statuscode: 200,
                message: 'Schedule deleted successfully'
            });
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                statuscode: 500,
                message: 'Internal error while deleting the schedule'
            });
        }
    }
}

/**
 * Check if the given date is a past date
 * @param {string} date 
 * @returns {boolean}
 */
const dateValidator = (date) => { return moment(date).isBefore(IST, "day"); }

/**
 * Check if the given date is a past time
 * @param {string} time 
 * @returns {boolean}
 */
const timeValidator = (time) => { return moment(time, 'HH:mm').isBefore(IST); }


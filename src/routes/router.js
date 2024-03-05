const Router = require('express').Router();
const appComponent = require('../components/component');

Router.post('/schedule', appComponent.createSchedule);
Router.get('/schedule/:id', appComponent.getScheduleById);
Router.get('/schedules/', appComponent.getAllSchedules);

module.exports = Router;
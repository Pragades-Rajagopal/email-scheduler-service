const Router = require('express').Router();
const appComponent = require('../components/component');
const validator = require('../validations/validator');

Router.post('/schedule', validator.postValidations, appComponent.createSchedule);
Router.get('/schedule/:id', appComponent.getScheduleById);
Router.get('/schedules/', appComponent.getAllSchedules);
Router.put('/schedule/:id', validator.putValidations, appComponent.updateSchedule);
Router.delete('/schedule/:id', appComponent.deleteSchedule);

module.exports = Router;
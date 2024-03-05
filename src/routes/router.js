const Router = require('express').Router();
const appComponent = require('../components/component');

Router.get('/home', appComponent.home);

module.exports = Router;
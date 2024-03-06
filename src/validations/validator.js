const { check } = require('express-validator');

exports.postValidations = [
    check('date')
        .exists()
        .not()
        .isEmpty()
        .withMessage("date is mandatory")
        .isISO8601('yyyy-MM-dd')
        .withMessage("date should be of format 'YYYY-MM-DD'"),
    check('time')
        .exists()
        .not()
        .isEmpty()
        .withMessage("time is mandatory")
        .matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
        .withMessage("time should be of format 'hh:mm'"),
    check('sendTo')
        .exists()
        .not()
        .isEmpty()
        .withMessage('email is mandatory')
        .isEmail()
        .withMessage('Invalid email format')
]

exports.putValidations = [
    check('date')
        .exists()
        .not()
        .isEmpty()
        .withMessage("date is mandatory")
        .isISO8601('yyyy-MM-dd')
        .withMessage("date should be of format 'YYYY-MM-DD'"),
    check('time')
        .exists()
        .not()
        .isEmpty()
        .withMessage("time is mandatory")
        .matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
        .withMessage("time should be of format 'hh:mm'"),
    check('sendTo')
        .exists()
        .not()
        .isEmpty()
        .withMessage('email is mandatory')
        .isEmail()
        .withMessage('Invalid email format')
]
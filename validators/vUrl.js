const {body, sanitizeBody, param, sanitizeParam} = require('express-validator');

module.exports.vUrl = [
    sanitizeBody('longUrl').trim().stripLow(),
    body('longUrl')
    .isString().withMessage("Url needs to be a string")
    .isURL().withMessage("Url needs to be properly formated")
    //.isLength({ max: 3000}).withMessage("Url needs to be properly formated")
];

module.exports.vCode = [
    sanitizeParam('urlCode').trim().stripLow(),
    param('urlCode')
    .isString().withMessage("Code needs to be a string")
    //.isLength({ max: 10 }).withMessage("Lengtherror")
    .matches(/(^[a-zA-Z0-9-_]+$)/).withMessage("This is not a valid Code")
]
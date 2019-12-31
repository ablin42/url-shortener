const {body, sanitizeBody} = require('express-validator');

module.exports.vUrl = [
    sanitizeBody('longUrl').trim().stripLow(),
    body('longUrl').isLength({ min: 9, max: 45}).withMessage("xpojzide")
];
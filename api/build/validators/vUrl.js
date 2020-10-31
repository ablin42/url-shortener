"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
module.exports.vUrl = [
    express_validator_1.body("longUrl")
        .trim()
        .stripLow()
        .isString()
        .withMessage("Url needs to be a string")
        .isURL()
        .withMessage("Url needs to be properly formated"),
];
module.exports.vCode = [
    express_validator_1.param("urlCode").trim().stripLow(),
    express_validator_1.param("urlCode")
        .isString()
        .withMessage("Code needs to be a string")
        .matches(/(^[a-zA-Z0-9-_]+$)/)
        .withMessage("This is not a valid Code"),
];
//# sourceMappingURL=vUrl.js.map
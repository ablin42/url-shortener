"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const pe = require("parse-error");
module.exports = {
    promise: function (promise) {
        return __awaiter(this, void 0, void 0, function* () {
            return promise
                .then((data) => {
                return [null, data];
            })
                .catch((err) => [pe(err)]);
        });
    },
    checkValidationResult: function (result) {
        return __awaiter(this, void 0, void 0, function* () {
            let errors = [];
            if (!result.isEmpty()) {
                result.errors.forEach((element) => {
                    errors.push(element);
                });
            }
            return errors;
        });
    },
};
//# sourceMappingURL=utils.js.map
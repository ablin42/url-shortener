"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const router = express.Router();
const validUrl = __importStar(require("valid-url"));
const shortid_1 = __importDefault(require("shortid"));
const mongo_sanitize_1 = __importDefault(require("mongo-sanitize"));
require("dotenv").config();
const utils = require("../utils");
const Url_1 = __importDefault(require("../models/Url"));
const { vUrl } = require("../validators/vUrl");
router.post("/shorten", vUrl, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = yield utils.checkValidationResult(express_validator_1.validationResult(req));
        if (errors.length > 0)
            throw new Error("Incorrect URL format");
        const { longUrl } = req.body;
        const baseUrl = process.env.HOST;
        const urlCode = shortid_1.default.generate();
        if (!validUrl.isWebUri("http://" + baseUrl))
            return res
                .status(401)
                .json({ error: true, message: "Invalid base URL" });
        if (validUrl.isWebUri(longUrl)) {
            var [err, url] = yield utils.promise(Url_1.default.findOne({ longUrl }));
            if (err)
                throw new Error("An error occured while looking for your URL");
            if (url) {
                return res.status(200).json(url);
            }
            else {
                const shortUrl = baseUrl + "/" + urlCode;
                let url = new Url_1.default({ longUrl, shortUrl, urlCode });
                [err, url] = yield utils.promise(url.save());
                if (err)
                    throw new Error("An error occured while creating your short URL");
                return res.status(200).json(url);
            }
        }
        else
            return res
                .status(200)
                .json({ error: true, message: "Invalid long URL" });
    }
    catch (err) {
        console.log("Shorten api error:", err.message);
        return res.status(200).json({ error: true, message: err.message });
    }
}));
router.get("/:urlCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errors = yield utils.checkValidationResult(express_validator_1.validationResult(req));
        if (errors.length > 0)
            throw new Error("Incorrect Code");
        let { urlCode } = mongo_sanitize_1.default(req.params);
        var [err, url] = yield utils.promise(Url_1.default.findOne({ urlCode }));
        if (err)
            throw new Error("An error occured while looking for your URL");
        if (url)
            return res.status(200).json(url);
        else
            return res.status(200).json({ error: true, message: "No URL found" });
    }
    catch (err) {
        console.log("Get URL API error:", err.message);
        return res.status(200).json({ error: true, message: err.message });
    }
}));
module.exports = router;
//# sourceMappingURL=url.js.map
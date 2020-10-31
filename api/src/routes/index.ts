import * as express from "express";
const router = express.Router();
import { validationResult } from "express-validator";
import * as path from "path";
import sanitize from "mongo-sanitize";

import Url from "../models/Url";
const { vCode } = require("../validators/vUrl");
const utils = require("../utils");

// @route   GET /:code
// @desc    Redirect to long/original URL from short URL
router.get("/:urlCode", vCode, async (req, res) => {
	try {
		let errors = await utils.checkValidationResult(validationResult(req));
		if (errors.length > 0) throw new Error("Incorrect Code");

		let { urlCode } = sanitize(req.params);

		var [err, url] = await utils.promise(Url.findOne({ urlCode }));
		if (err) throw new Error("An error occured while looking for your URL");
    if (url) return res.status(200).redirect(url.longUrl);
    else throw new Error("No URL found");
	} catch (err) {
    console.log("Get URL error:", err.message);
    return res.sendFile(path.join(__dirname, "../../../app/build/index.html"));
	}
});

module.exports = router;

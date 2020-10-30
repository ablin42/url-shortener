const express = require("express");
const router = express.Router();
const path = require("path");
const { validationResult } = require("express-validator");

const utils = require("../utils");
const Url = require("../models/Url");
const { vCode } = require("../validators/vUrl");

// @route   GET
// @desc    Landing page, shorten url form
router.get("/", async (req, res) => {
	try {
		//return res.status(200).render("index");
		return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
	} catch (err) {
		console.log("Index route error", err.message);
		return res.status(500).json({ error: true, message: err.message });
	}
});

module.exports = router;

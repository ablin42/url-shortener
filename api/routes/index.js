const express = require("express");
const router = express.Router();
const rp = require("request-promise");
const path = require("path");
const validUrl = require("valid-url");

const utils = require("../utils");
const Url = require("../models/Url");
const { validationResult } = require("express-validator");
const { vUrl, vCode } = require("../validators/vUrl");

router.get("/", async (req, res) => {
  try {
    //return res.status(200).render("index");
    return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
  } catch (err) {
    console.log("Index route error", err.message);
    return res.status(500).json({ error: true, message: err.message });
  }
});

// @route   GET /:code
// @desc    Redirect to long/original URL from short URL
router.get("/:urlCode", vCode, async (req, res) => {
  try {
    let errors = await utils.checkValidationResult(validationResult(req));
    if (errors.length > 0) throw new Error("Incorrect Code");

    let { urlCode } = req.params; //sanitize (verify code look alike a code we could have generated?)

    var [err, url] = await utils.promise(Url.findOne({ urlCode }));
    if (err) throw new Error("An error occured while looking for your URL");
    if (url) return res.status(200).redirect(url.longUrl);
    else throw new Error("No URL found");
  } catch (err) {
    console.log("Get URL error:", err.message);
    return res.status(404).redirect("/");
  }
});

// @route   GET /:code
// @desc    Display the shortened link
router.get("/link/:urlCode", vCode, async (req, res) => {
  try {
    let errors = await utils.checkValidationResult(validationResult(req));
    if (errors.length > 0) throw new Error("Incorrect Code");
    let { urlCode } = req.params; //sanitize (verify code look alike a code we could have generated?)
    var [err, url] = await utils.promise(Url.findOne({ urlCode }));
    if (err) throw new Error("An error occured while looking for your URL");
    if (url)
      return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
    else throw new Error("URL not found");
  } catch (err) {
    console.log("Display URL error:", err.message);
    //redirect to home and display a flash message
    return res.status(500).redirect("/");
  }
});

module.exports = router;

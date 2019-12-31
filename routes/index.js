const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const validUrl = require('valid-url');

const utils = require('../utils');
const Url = require('../models/Url');

const {validationResult} = require('express-validator');
const {vUrl, vCode} = require('../validators/vUrl');

router.get('/', async (req, res) => {
try {
    return res.status(200).render('index');
} catch (err) {
    console.log("Index route error", err.message);
    return res.status(500).json({error: true, message: err.message});
}})

// @ POST route for front-end to API, can probably be replaced with ajax call
router.post('/', vUrl, async (req, res) => {
try {
    let errors = await utils.checkValidationResult(validationResult(req));
    if (errors.length > 0)
        throw new Error("Incorrect URL");
    
    const { longUrl } = req.body;
    if (validUrl.isWebUri(longUrl)) {
            let options = {
            method: 'POST',
            uri: 'http://localhost:9191/api/url/shorten', //change URL here
            body: {longUrl},
            json: true
        };
        
        await rp(options)
        .then(function (urlObj) {
            return res.status(200).redirect(`/link/${urlObj.urlCode}`);
        })
        .catch(function (err) {
            console.error("An error occured while processing the query", err)
            //display flash message here
            return res.status(200).redirect(`/`);
        });
    } else 
        throw new Error("Invalid long URL");
} catch (err) {
    console.error("Post URL error:", err);
    //flash msg and redirect to /
    return res.status(500).redirect(`/`);
}})
    
// @route   GET /:code
// @desc    Redirect to long/original URL from short URL
router.get('/:urlCode', vCode, async (req, res) => {
try {
    let errors = await utils.checkValidationResult(validationResult(req));
    if (errors.length > 0)
        throw new Error("Incorrect Code");
        
    let { urlCode } = req.params; //sanitize (verify code look alike a code we could have generated?)

    var [err, url] = await utils.promise(Url.findOne({ urlCode }));
    if (err)
        throw new Error("An error occured while looking for your URL");
    if (url) 
        return res.status(200).redirect(url.longUrl);
    else
        return res.status(404).json({error: true, message: "No URL found"});
} catch (err) {
    console.error("Get URL error:", err.message);
    return res.status(500).json({error: true, message: err.message});
}})

// @route   GET /:code
// @desc    Display the shortened link
router.get('/link/:urlCode', vCode, async (req, res) => {
try {
    let errors = await utils.checkValidationResult(validationResult(req));
    if (errors.length > 0)
        throw new Error("Incorrect Code");

    let { urlCode } = req.params; //sanitize (verify code look alike a code we could have generated?)

    var [err, url] = await utils.promise(Url.findOne({ urlCode }));
    if (err)
        throw new Error("An error occured while looking for your URL");
    if (url) 
        return res.status(200).render("link", url);
    else 
        throw new Error("URL not found");
} catch (err) {
    console.error("Display URL error:", err.message);
    //redirect to home and display a flash message
    return res.status(500).redirect('/');
}})

module.exports = router;
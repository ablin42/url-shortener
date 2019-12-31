const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const utils = require('../utils');
const Url = require('../models/Url');

const {validationResult} = require('express-validator');
const {vUrl} = require('../validators/vUrl');

// @route   POST /api/url/shorten
// @desc    Create short URL from posted long URL /// Send short URL if long URL already exist in DB
router.post('/shorten', vUrl, async (req, res) => {
try {
    let errors = await utils.checkValidationResult(validationResult(req));
    if (errors.length > 0)
        throw new Error("Incorrect URL");

    const { longUrl } = req.body;
    const baseUrl = config.get('baseURL');
    const urlCode = shortid.generate();

    if (!validUrl.isWebUri(baseUrl)) 
        return res.status(401).json({error: true, message: "Invalid base URL"});

    if (validUrl.isWebUri(longUrl)) {
        var [err, url] = await utils.promise(Url.findOne({ longUrl }));
        if (err)
            throw new Error("An error occured while looking for your URL");
        
        if (url) {
            return res.status(200).json(url);
        } else {
            const shortUrl = baseUrl + '/' + urlCode;
            let url = new Url({longUrl, shortUrl, urlCode});

            [err, url] = await utils.promise(url.save());
            if (err)
                throw new Error("An error occured while creating your short URL");

            return res.status(200).json(url);
        }
    } else 
        return res.status(401).json({error: true, message: "Invalid long URL"});
} catch (err) {
    console.error("Shorten api error:", err.message);
    return res.status(200).json({error: true, message: err.message});
}})

module.exports = router;
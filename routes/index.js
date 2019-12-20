const express = require('express');
const router = express.Router();

const utils = require('../utils');
const Url = require('../models/Url');

// @route   GET /:code
// @desc    Redirect to long/original URL from short URL
router.get('/:code', async (req, res) => {
try {
    var [err, url] = await utils.promise(Url.findOne({ urlCode: req.params.code }));
    if (err)
        throw new Error("An error occured while looking for your URL");

    if (url) 
        return res.status(200).redirect(url.longUrl);
    else
        return res.status(404).json({error: true, message: "No URL found"});
} catch (err) {
    console.log("Get URL error:", err.message);
    return res.status(500).json({error: true, message: err.message});
}})

module.exports = router;
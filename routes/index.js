const express = require('express');
const router = express.Router();
const rp = require('request-promise');

const utils = require('../utils');
const Url = require('../models/Url');

// @route   GET /:code
// @desc    Redirect to long/original URL from short URL
router.get('/:code', async (req, res) => {
try {
    let code = req.params.code; //sanitize

    var [err, url] = await utils.promise(Url.findOne({ urlCode: code }));
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

router.post('/', async (req, res) => {
try {
    let options = {
        method: 'POST',
        uri: 'http://localhost:9191/api/url/shorten', //change URL here
        body: {
            longUrl: req.body.longUrl //sanitize
        },
        json: true // Automatically stringifies the body to JSON
    };

    await rp(options)
    .then(function (urlObj) {
        return res.status(200).redirect(`/link/${urlObj.urlCode}`);
    })
    .catch(function (err) {
        console.log("error", err)
        //display flash message here
        return res.status(200).redirect(`/`);
    });
} catch (err) {
    console.error("Post URL error:", err);
    //flash msg and redirect to /
    return res.status(500).redirect(`/`);
}})

router.get('/', async (req, res) => {
try {
    return res.status(200).render('index');
} catch (err) {
    console.log("Index route error", err.message);
    return res.status(500).json({error: true, message: err.message});
}})

router.get('/link/:code', async (req, res) => {
try {
    let code = req.params.code; //sanitize

    var [err, url] = await utils.promise(Url.findOne({ urlCode: code }));
    if (err)
        throw new Error("An error occured while looking for your URL");
    
    if (url) 
        return res.status(200).render("link", url);
    else 
        throw new Error("URL not found");
} catch (err) {
    console.log("Index route error", err.message);
    //redirect to home and display a flash message
    return res.status(500).redirect('/');
}})

module.exports = router;
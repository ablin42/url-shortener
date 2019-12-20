const express = require('express');
const router = express.Router();
const validUrl = require ('valid-url');
const shortid = require ('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
try {
    const { longUrl } = req.body;

    const baseUrl = config.get('baseURL');

    // Check baseUrl
    if (!validUrl.isUri(baseUrl)) 
        return res.status(401).json({error: true, message: "Invalid base URL"});

    // Create url code
    const urlCode = shortid.generate();

    // Check longUrl
    if (validUrl.isUri(longUrl)) {
        let url = await Url.findOne({ longUrl }); // var [err, res] = 
        
        if (url) {
            return res.status(200).json(url);
        } else {
            const shortUrl = baseUrl + '/' + urlCode;

            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
            })

            await url.save(); //check return

            return res.status(200).json(url);
        }
    } else 
        return res.status(401).json({error: true, message: "Invalid long URL"});

} catch (err) {
    console.error("Shorten api error:", err.message);
    return res.status(500).json({error: true, message: err.message});
}})

module.exports = router;
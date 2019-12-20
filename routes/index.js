const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route   GET /:code
// @desc    Redirect to long/original URL
router.get('/:code', async (req, res) => {
try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
        return res.status(200).redirect(url.longUrl);
    } else
        return res.status(404).json({error: true, message: "No url found"});
} catch (err) {
    console.log("Get URL error:", err.message);
    return res.status(500).json({error: true, message: err.message});
}})

module.exports = router;
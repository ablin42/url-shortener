const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String, //required etc?
    shortUrl: String,
    date: { type: String, default: Date.now}
}, {timestamps: true});

module.exports = mongoose.model('Url', UrlSchema)
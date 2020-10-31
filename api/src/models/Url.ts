import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    date: {type: String, default: Date.now}
}, {timestamps: true});

export default mongoose.model('Url', UrlSchema)
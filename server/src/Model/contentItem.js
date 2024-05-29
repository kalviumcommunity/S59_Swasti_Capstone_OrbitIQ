const mongoose = require('mongoose');

const contentItemSchema = new mongoose.Schema({
    text: { type: String, required: true },
    images: [String], 
    videos: [String]
});
const ContentItemSchema = mongoose.model('Content', contentItemSchema);
module.exports = ContentItemSchema;

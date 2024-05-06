const mongoose = require('mongoose');

const contentItemSchema = new mongoose.Schema({
    text: { type: String, required: true },
    images: [String], 
    videos: [String]
});

const learningUnitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    content: [contentItemSchema], 
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
});

const LearningUnit = mongoose.model('LearningUnit', learningUnitSchema);

module.exports = LearningUnit;

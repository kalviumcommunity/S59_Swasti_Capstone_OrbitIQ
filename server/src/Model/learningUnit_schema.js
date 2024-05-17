const mongoose = require('mongoose');

const learningUnitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }], 
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
});

const LearningUnit = mongoose.model('LearningUnit', learningUnitSchema);

module.exports = LearningUnit;

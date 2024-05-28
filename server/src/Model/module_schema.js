const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    learningUnits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LearningUnit' }],
    ImgUrl: { type: String, required: true },
    level: { type: String, required: true }
});

const LearningModule = mongoose.model('LearningModule', learningModuleSchema);

module.exports = LearningModule;

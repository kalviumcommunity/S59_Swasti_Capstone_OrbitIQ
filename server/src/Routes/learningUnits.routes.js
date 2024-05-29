const express = require("express");
const router = express.Router();

const Schema = require("../Model/learningUnit_schema")
const QuizSchema = require("../Model/quiz_schema")
const moduleSchema = require("../Model/module_schema");
const { ValidateLearningModule } = require("../Model/joi_schema")

router.post('/add-lm', async (req, res) => {

    try {
        const { error } = ValidateLearningModule(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const newModule = new moduleSchema({
            title: req.body.title,
            description: req.body.description,
            ImgUrl: req.body.ImgUrl,
            level: req.body.level
        })
        const savedLM = await newModule.save();
        res.status(201).json(savedLM)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to add LM. Try again later." })
    }
})
router.post('/add-quiz/:lu_id', async (req, res) => {
    const lu_id = req.params.lu_id
    try {
        const newQuiz = new QuizSchema({
            title: req.body.title,
            level: req.body.level,
            questions: req.body.questions
        })
        const savedQuiz = await newQuiz.save();
        await Schema.findByIdAndUpdate(lu_id, { $push: { quizzes: savedQuiz._id } })
        res.status(201).json(savedQuiz)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to add quiz in lu. Try again later." })
    }
})
router.post('/add-lu/:module_id', async (req, res) => {
    const module_id = req.params.module_id
    try {
        const newLU = new Schema({
            title: req.body.title,
            description: req.body.description
        })
        const savedLU = await newLU.save()
        await moduleSchema.findByIdAndUpdate(module_id, { $push: { learningUnits: savedLU._id } })
        res.status(201).json(savedLU)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to add lu. Try again later." })
    }
})
router.get('/module', async (req, res) => {
    try {
        const modules = await moduleSchema.find().populate('learningUnits');
        res.status(200).json(modules);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get modules" })
    }

})
router.get('/module/:id', async (req, res) => {
    try {
        const module = await moduleSchema.findById(req.params.id).populate('learningUnits');
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        res.status(200).json(module);
    } catch (err) {
        res.status(500).json({ message: "Failed to get module" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Schema = require("../Model/learningUnit_schema")
const moduleSchema = require("../Model/module_schema")

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

module.exports = router;

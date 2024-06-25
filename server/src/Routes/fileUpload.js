const express = require("express");
const router = express.Router();
const { User } = require("../Model/user_schema");
const multer = require("multer");
const mongoose = require("mongoose")
const rateLimit = require('express-rate-limit');

const storage = multer.diskStorage({
    destination: function (req, file, nd) {
        return nd(null, "./public/UploadedImages");
    },
    filename: function (req, file, nd) {
        return nd(null, `${Date.now() + file.originalname}`);
    }
});
const validateFile = (req, file, nd) => {
    if (!file.mimetype.startsWith('image')) {
        return nd(new Error("Images are allowed"))
    }
    nd(null, true);
}
const limits = {
    fileSize: 5 * 1024 * 1024
}
const upload = multer({ storage: storage, validateFile: validateFile, limits: limits });
const path = require('path');
const limiter = rateLimit({
    windowMs: 7 * 24 * 60 * 60 * 1000,
    max: 2,
    message: 'You can can change image twice a week. Try again after a week.'
});

// Database read route performed 
router.get("/profileImage/:userId", async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log('Invalid user ID');
        return res.status(400).send({ error: 'Invalid user ID' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const imagePath = path.resolve(__dirname, '..', '..', user.Image);
        res.sendFile(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Database write route performed
router.patch("/updateProfileImage/:userId", limiter, upload.single('file'), async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('Invalid user ID');
            return res.status(400).send({ error: 'Invalid user ID' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.Image = req.file.path;
        await user.save();
        res.json(user);
    } catch (error) {
        if (error.name === 'RateLimitError') {
            console.log('Rate limit exceeded:', error);
            res.status(429).send('Too many requests, please try again later.');
        } else {
            console.log(`File can't be uploaded:`, error);
            res.status(500).send(`Internal Server Error: ${error}`);
        }
    }
});

module.exports = router;

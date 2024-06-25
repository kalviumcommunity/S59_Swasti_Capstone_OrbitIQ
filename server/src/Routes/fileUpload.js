const express = require("express");
const router = express.Router();
const { User } = require("../Model/user_schema");
const multer = require("multer");
const mongoose = require("mongoose");
const rateLimit = require('express-rate-limit');
const redisClient = require('../utils/redisClient');
const path = require('path');

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
const limiter = rateLimit({
    windowMs: 7 * 24 * 60 * 60 * 1000,
    max: 2,
    message: 'You can change image twice a week. Try again after a week.'
});

// Database read route performed with Redis cache
router.get("/profileImage/:userId", async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log('Invalid user ID');
        return res.status(400).send({ error: 'Invalid user ID' });
    }
    try {
        const cachedImage = await redisClient.get(`user:${userId}:image`);
        if (cachedImage) {
            console.log('Sending cached image from Redis:', cachedImage);
            return res.sendFile(path.resolve(cachedImage));
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const imagePath = path.resolve(__dirname, '..', '..', 'public', 'UploadedImages', user.Image);
        await redisClient.set(`user:${userId}:image`, imagePath, 'EX', 60 * 60 * 24);
        res.sendFile(imagePath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Database write route performed
router.patch("/updateProfileImage/:userId", limiter, upload.single('file'), async (req, res) => {
    const userId = req.params.userId;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('Invalid user ID');
            return res.status(400).send({ error: 'Invalid user ID' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const currentImage=user.Image;
        user.Image = req.file.path;
        await user.save();
        await redisClient.set(`user:${userId}:image`, req.file.path, 'EX', 60 * 60 * 24);
        res.json(user);
    } catch (error) {
        if (error.name === 'RateLimitError') {
            console.log('Rate limit exceeded:', error);
            res.status(429).send('Too many requests, please try again later.');
        } else if (error.name === 'MongoError') {
            console.log('MongoDB error:', error);
            res.status(500).send('Database error. Please try again later.');
        } else if (error.name === 'MulterError') {
            console.log('Multer error:', error);
            res.status(400).send('File upload error. Please upload a valid file.');
        } else {
            console.log('Unknown error:', error);
            res.status(500).send(`Internal Server Error: ${error.message}`);
        }
        
        if(currentImage){
            await redisClient.set(`user:${userId}:image`, currentImage, 'EX', 60 * 60 * 24);
        }
    }
});

module.exports = router;

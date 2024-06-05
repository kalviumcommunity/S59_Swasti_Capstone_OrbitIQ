const express = require("express");
const router = express.Router();
const { User } = require("../Model/user_schema");
const multer = require("multer");

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
const upload = multer({ storage: storage, validateFile: validateFile });
const path = require('path');

// Database read route performed 
router.get("/profileImage/:userId", async (req, res) => {
    const userId = req.params.userId;
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
router.patch("/updateProfileImage/:userId", upload.single('file'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.Image = req.file.path;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(`File can't be uploaded:` + error);
        res.status(500).send('Internal Server Error:' + error);
    }
});

module.exports = router;

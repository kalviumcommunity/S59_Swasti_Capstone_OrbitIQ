const express = require("express");
const router = express.Router();

const Schema = require("../Model/schema");


router.get("/", async (req, res) => {
    try {
      const data = await Schema.find();
      res.json(data);
    } catch (err) {
      res.status(500).send("error" + err);
    }
});


module.exports = router;
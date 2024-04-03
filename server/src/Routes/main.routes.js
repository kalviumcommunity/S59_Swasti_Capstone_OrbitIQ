const express = require("express");
const router = express.Router();
const { connectToDB } = require("../../db");
const Schema = require("../Model/schema");


router.get("/", async (req, res) => {
    try {
      const data = await Schema.find();
      res.json(data);
    } catch (err) {
      res.send("error" + err);
    }
});

connectToDB();

module.exports = router;
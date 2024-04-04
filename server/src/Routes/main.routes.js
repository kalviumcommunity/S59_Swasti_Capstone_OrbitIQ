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

router.post("/add",async(req,res)=>{
  const {title,description}=req.body;

  try{
    const data = new Schema({
      title,
      description
    });
    const saved=await data.save();
    res.status(201).json({message:"New data Added✅"});
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
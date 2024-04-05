const express = require("express");
const router = express.Router();

const Schema = require("../Model/schema");
const {ValidateSchema}=require("../Model/joi_schema")

router.get("/", async (req, res) => {
    try {
      const data = await Schema.find();
      res.json(data);
    } catch (err) {
      console.log("Error occured while fetching the data:",err);
      res.status(500).send("error" + err);
    }
});

router.post("/add",async(req,res)=>{
  const {title,description}=req.body;

  try{
    const {error}=ValidateSchema(req.body)
    if(error){
      return res.status(400).json({ error: error.details[0].message });
    } 

    const data = new Schema({
      title,
      description
    });
    const saved=await data.save();
    res.status(201).json({message:"New data Added✅"});
  }
  catch(error){
    console.log("Error occured while adding the data:",error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Schema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).send("Data not found");
    }
    res.json(data);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});


module.exports = router;
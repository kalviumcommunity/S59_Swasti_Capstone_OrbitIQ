const mongoose=require('mongoose');

const Schema= new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    description: String,
});

const Data = mongoose.model('datas',Schema);

module.exports=Data;
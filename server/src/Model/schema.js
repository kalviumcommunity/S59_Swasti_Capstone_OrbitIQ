const mongoose=require('mongoose');

const Schema= new mongoose.Schema({
    title: String,
    description: String,
});

const Data = mongoose.model('datas',Schema);

module.exports=Data;
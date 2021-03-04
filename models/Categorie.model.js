const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    title:{required:true,type:String},
    image:{required:true,type:String}
    
},{timestamps:true});



const Categorie = mongoose.model('Categorie',categorieSchema);

exports.Categorie=Categorie;
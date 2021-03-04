const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name:{required:true,type:String},
    email:{required:true,type:String},
    address:{required:true,type:String},
    phone:{required:true,type:String},
    title:{required:true,type:String},
    
},{timestamps:true});



const Job = mongoose.model('Job',jobSchema);

exports.Job=Job;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName:{required:true,type:String},
    lastName:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String},
    address:{required:true,type:String},
    phone:{required:true,type:String},
    orders:{type:[{}]},
    image:{type:String,default:'/images/noUser.png'},
    isAdmin:{type:Boolean,default:false}
    
},{timestamps:true});


userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id:this._id,firstName:this.firstName,email:this.email,isAdmin:this.isAdmin},'restaurant');
    return token;
}
const User = mongoose.model('User',userSchema);
exports.User=User;
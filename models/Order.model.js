const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({

    userId:String,
    name:String,
    email:String,
    phone:String,
    address:String,
    orders:[],
    total:Number
},{timestamps:true});



const Order = mongoose.model('Order',ordersSchema);

exports.Order=Order;
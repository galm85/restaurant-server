const router = require('express').Router();
const {Order} = require('../models/Order.model');



//get all Orders
router.get('/',async(req,res)=>{
    try {
        const orders = await Order.find({});
        res.send(orders);
    } catch (error) {
        res.send(error.message);
    }
})

//post new order
router.post('/',async(req,res)=>{
    try {
        const order = new Order(req.body);
        await order.save();
        res.send('Save Order');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/remove-order/:id',async(req,res)=>{
    try{
        await Order.findByIdAndRemove(req.params.id);
        res.send('Order Removed');
    }catch(error){
        res.status(400).send(error.message);
    }

})


module.exports = router;
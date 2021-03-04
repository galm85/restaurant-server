const router = require('express').Router();
const {User} = require('../models/User.model');
const bcrypt = require('bcrypt');

//get all users
router.get('/',async(req,res)=>{
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//register new user
router.post('/',async(req,res)=>{
    
    let user = await User.findOne({email:req.body.email});
    
    if(user){
        return res.status(500).send('Email is already taken');
    }
    try{
        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password,salt);
        await user.save();
        res.send('User saved');
    }catch(error){
        res.status(400).send(error.message);
    }

})


//sign in user 
router.post('/sign-in',async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Wrong email or password');
    }
    
    let compare = await bcrypt.compare(req.body.password,user.password);
    if(!compare){
        return res.status(400).send('Wrong email or password');

    }

    return res.json({token:user.generateToken()});

    

})

//get user by id
router.get('/get-user/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        res.send(user);
    } catch (error) {
        return null;
    }
})


//add order
router.patch('/add-order/:id',async(req,res)=>{
    try{
        let {orders} = await User.findById(req.params.id);
        orders.push(req.body);
        await User.findByIdAndUpdate(req.params.id,{orders:orders});
        res.status(200).send('Order Success')
    }catch(error){
        res.status(400).send(error.message);
    }
})

//updateQuantity
router.patch('/updateQuantity/:id',async(req,res)=>{
    try{

        let {orders} = await User.findById(req.params.id);
        for(let i = 0; i<orders.length;i++){
            if (orders[i].itemId === req.body.itemId){
                if(req.body.op === '+'){
                    orders[i].quantity = orders[i].quantity+1;
                }
                if(req.body.op === '-' && orders[i].quantity>1){
                    orders[i].quantity = orders[i].quantity-1;
                }
            } 
        }
        await User.findByIdAndUpdate(req.params.id,{orders:orders});
        res.status(200).send('update quantity');
    }catch(error){
        res.status(400).send(error.message);
    }

})

//remove item from order
router.patch('/remove-item/:id',async(req,res)=>{
    try{
        let user = await User.findById(req.params.id);
        let filterdOrders = await user.orders.filter(order=>order.itemId !== req.body.id);
        await User.findByIdAndUpdate(req.params.id,{orders:filterdOrders});
        res.status(200).send('Remove Item');
    }catch(error){
        res.status(500).send(error.message);
    }
})

//clear orders
router.patch('/checkout/:id',async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,{orders:[]})
        res.send('checkout');
    }catch(error){
        res.status(400).send(error.message);

    }
})


//update user data
router.patch('/update-user-data/:id',async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,req.body);
        res.send('user updated');

    }catch(error){
        res.status(400).send(error.message);
    }

})


module.exports = router;
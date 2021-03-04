const router = require('express').Router();
const {Product} = require('../models/Product.model');



//get all products
router.get('/',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.send(error.message);
    }
})


//add a new product
router.post('/',async(req,res)=>{
    try {
        const product = new Product(req.body);
        await product.save();
        res.send("New product added to the menu");
    } catch (error) {
        res.status(400).send(error.message);
        
    }
})

//get products by category
router.get('/:category',async(req,res)=>{
    try {
        const products = await Product.find({category:req.params.category});
        res.send(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//get product by id
router.get('/product/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.send(product)
    } catch (error) {
        res.status(400).send(error.message);
    }
})


//remove product by id
router.delete('/:id',async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        return res.send('Product deleted');
    }catch(error){
        res.status(400).send(error.message);
    }
})


//update product 
router.patch('/update-product/:id',async(req,res)=>{
    try{
        await Product.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send('update Product');
    }catch(error){
        res.status(400).send(error.message);
    }
})




module.exports = router;
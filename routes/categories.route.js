const router = require('express').Router();
const {Categorie} = require('../models/Categorie.model');



//get all Categories
router.get('/',async(req,res)=>{
    try {
        const categories = await Categorie.find({});
        res.send(categories);
    } catch (error) {
        res.send(error.message);
    }
})

//add new Category
router.post('/',async(req,res)=>{
    try {
        const newCategory = new Categorie(req.body);
        await newCategory.save();
        res.send('Saved category')
    } catch (error) {
        res.status(400).send(error.message);
    }
})

//remove Category
router.delete('/:id',async(req,res)=>{
    try {
        await Categorie.findByIdAndDelete(req.params.id);
        res.send('Category deleted');
    } catch (error) {
        res.status(400).send(error.message);
        
    }
})

//update category
router.patch('/update-category/:id',async(req,res)=>{
    try {
        await Categorie.findByIdAndUpdate(req.params.id,req.body);
        res.send('Category updated');
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports = router;
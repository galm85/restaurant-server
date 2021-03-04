const router = require('express').Router();
const {Job} = require('../models/Job.model');



router.get('/',async(req,res)=>{
    try {
        const jobs = await Job.find({});
        res.send(jobs);

    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/',async(req,res)=>{
    try{
        let job = new Job(req.body);
        await job.save();
        res.send('job added');
    }catch(error){
        res.status(200).send(error.message);
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        await Job.findByIdAndRemove(req.params.id);
        res.send('job deleted');
    }catch(error){
        res.status(400).send(error.message);
    }

})


module.exports = router;
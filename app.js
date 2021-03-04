const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4444;

//routes
const productsRoute = require('./routes/products.route');
const categoriesRoute = require('./routes/categories.route');
const usersRoute = require('./routes/users.route');
const ordersRoute = require('./routes/orders.route');
const jobsRoute = require('./routes/jobs.route');


//connect to mongoDB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(console.log('connect to mongoDB'))
  .then(app.listen(PORT,console.log(`Server is running on Port: ${PORT}`)))
  


app.use(express.json({limit:"30mb"}));
app.use(cors());

app.use('/products',productsRoute);
app.use('/categories',categoriesRoute);
app.use('/users',usersRoute);
app.use('/orders',ordersRoute);
app.use('/jobs',jobsRoute);




app.get('/',(req,res)=>{
    res.send('ROOT');
})








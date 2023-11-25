const express = require('express');
const mongoose = require('mongoose');
const db = require('./db/conn')
const app = express()


const port = 3000
app.use(express.json())

app.get ('/',(req, res)=>res.send("Hello, world!"));


const route = require('./routes/user.routes');
app.use("/api/users",route);

const categoryRoute = require('./routes/category.routes');
app.use("/api/category",categoryRoute);

const productRoute = require('./routes/products.route');
app.use("/api/products",productRoute);

const cartRoute= require('./routes/cart.routes');
app.use("/api/cart",cartRoute);

const orderRoute= require('./routes/order.route');
app.use("/api/order",orderRoute);


app.listen (port , async function () {
    console.log('Server started at 3000');
    let conn;
    try {
        conn = await mongoose.connect(db)
        console.log('Connected to database');
    }catch(e){
        console.error(e)
    }
})
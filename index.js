const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// MongoDB connection string (replace with your actual credentials)
const url = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(url)
    .then(() => {
        console.log('MongoDB server started');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Middleware to parse JSON requests
app.use(express.json());

// Routes
const coursesRouter = require('./routes/courses.route');
const usersRouter=require('./routes/users.route');
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

app.all('*',(req,res,next)=>{
    return res.status(404).json({status:"Error",msg:"this resourse not avaliable"})
})
// Start the server
app.listen(process.env.PORT||5000, () => {
    console.log('Server is listening on port 5000');
});
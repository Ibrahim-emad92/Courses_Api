const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MongoDB connection string (replace with your actual credentials)
const url = "mongodb+srv://Ibrahim:m01280594805@learn-mongodb.jvbcp.mongodb.net/codezone?retryWrites=true&w=majority&appName=Learn-mongodb";

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
app.use('/', coursesRouter);

// Start the server
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
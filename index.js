const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://honeyjoe942:PPpbUYKPI1erBhhH@techx.gkypa.mongodb.net/'; // Change this to your MongoDB URI
mongoose.connect(mongoURI)

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello from Express and MongoDB!');
});

// Define a User Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', UserSchema);

// API to create a new user
app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

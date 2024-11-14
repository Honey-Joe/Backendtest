const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Middleware to parse incoming JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all origins
app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['https://techx-24.vercel.app'];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  

  
 

// MongoDB connection string
const mongoURI = 'mongodb+srv://honeyjoe942:Honey0511@techx.gkypa.mongodb.net/'; // Change this to your MongoDB URI
mongoose.connect(mongoURI)

// Define a simple route


// Define a User Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    dept : String,
    college : String,
    event1 : JSON,
    event2 : JSON,
});

const User = mongoose.model('User', UserSchema);

// API to create a new user
app.post('/', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API to get all users
app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//To check email 
app.post("/email",async (req,res)=>{
    const email = req.body;
    try{
        const user = await User.findOne(email);
        if(user){
            return res.status(400).json({message:"Email already exist"})
        }
        res.status(200).json({message:"Email available"})

    }catch(e){
        res.status(500).json({message:"Server Error"})
        res.send(e);
    }

})
// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

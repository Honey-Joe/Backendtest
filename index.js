const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();


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
const mongoURI = process.env.MONGO_URI;
// Change this to your MongoDB URI
mongoose.connect(mongoURI)

// Define a simple route



// Define a User Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    dept : String,
    degree: String,
    contact: String,
    college : String,
    event1 : String,
    event2 : String,
});

const EventSchema = new mongoose.Schema({
    eventname: String,
    eventid: String,
    eventdesc: String,
    eventurl: String,
    rules: JSON
    
});
const NonEventSchema = new mongoose.Schema({
    eventname: String,
    eventid: String,
    eventdesc: String,
    eventurl: String,
    rules: JSON
});

const Event = mongoose.model('Event' , EventSchema);

const NonEvent = mongoose.model('NonEvent' , EventSchema);

const User = mongoose.model('User', UserSchema);
//Event Routes
app.post("/event", async(req,res)=>{
    const eventdata = new Event(req.body);
    try{
        const eventstrore = await eventdata.save();
        res.json(eventdata)
    }
    catch(e){
        res.status(400).json({message:"error"})
    }
})
app.get('/event/:eventid', async (req, res) => {
    const { eventid } = req.params; // Extract path parameter

    try {
        // Find the specific document by eventid
        const event = await Event.findOne({ eventid });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.put("/event/:id", async (req, res) => {
    try {
      const { id } = req.params; 
      const updatedData = req.body; 
  

      const updatedEvent = await Event.findOneAndUpdate({ eventid: id }, updatedData, {
        new: true, 
        runValidators: true 
      });
  
      if (!updatedEvent) {
        return res.status(404).send({ error: "Event not found" });
      }
  
      res.status(200).send(updatedEvent); 
    } catch (error) {
      res.status(500).send({ error: "Failed to update event", details: error.message });
    }
  });
app.get("/event", async(req,res)=>{
    try {
        const eusers = await Event.find();
        res.json(eusers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//NonTechnical Event Routes
app.get('/nonevent/:eventid', async (req, res) => {
    const { eventid } = req.params; // Extract path parameter

    try {
        // Find the specific document by eventid
        const event = await NonEvent.findOne({ eventid });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/nonevent", async(req,res)=>{
    const eventdata = new NonEvent (req.body);
    try{
        const eventstrore = await eventdata.save();
        res.json(eventdata)
    }
    catch(e){
        res.status(400).json({message:"error"})
    }
})

app.get("/nonevent", async(req,res)=>{
    try {
        const eusers = await NonEvent.find();
        res.json(eusers);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put("/nonevent/:id", async (req, res) => {
    try {
      const { id } = req.params; 
      const updatedData = req.body; 
  

      const updatedEvent = await NonEvent.findOneAndUpdate({ eventid: id }, updatedData, {
        new: true, 
        runValidators: true 
      });
  
      if (!updatedEvent) {
        return res.status(404).send({ error: "Event not found" });
      }
  
      res.status(200).send(updatedEvent); 
    } catch (error) {
      res.status(500).send({ error: "Failed to update event", details: error.message });
    }
  });


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
        res.status(200).json({message:"Email Available"})

    }catch(e){
        res.status(500).json({message:"Server Error"})
    }

})

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

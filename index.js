const express = require("express");
const mongoose = require("mongoose")

const app = express();

mongoose.connect("mongodb+srv://honeyjoe942:PPpbUYKPI1erBhhH@techx.gkypa.mongodb.net/Techx")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', UserSchema);



app.post('/users', async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get("/", (req,res)=>{

    res.send("Hello")

})



app.listen(3000)
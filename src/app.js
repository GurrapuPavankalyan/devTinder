
const express = require('express');
//require('./config/database');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        email: "Kohli@gmail.com",
        password: "Anushka232"
    });

    try {
        await user.save();
        res.send("User added successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }    
});

connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
        console.log("Server is started listening successfully!");
        });
    })
    .catch((err) => {
        console.error("Database cannot be conected");
        console.error(err.message);
    });


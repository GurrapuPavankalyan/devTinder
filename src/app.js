
const express = require('express');
//require('./config/database');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');

app.use(express.json());

app.post('/signup', async (req, res) => {
    //console.log(req.body);
    const user = new User(req.body);
    /* const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        email: "Kohli@gmail.com",
        password: "Anushka232"
    }); */

    try {
        await user.save();
        res.send("User added successfully!");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }    
});

// Get User by EmailId
app.get('/user', async (req, res) => {
    const userEmail = req.body.email;

    try {
        //const users = await User.find({email: userEmail});
        const users = await User.findOne({email: userEmail});
        if(users.length === 0) {
            res.status(404).send("User not found");
        } else{
            res.send(users);
        }
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// Feed API - GET /feed - get all the users from the database
app.get('/feed', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    }
    catch(err) {
        res.status(400).send("Something went wrong");
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


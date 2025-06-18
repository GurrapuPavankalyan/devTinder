
const express = require('express');
//require('./config/database');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth }= require('./middlewares/auth');


app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {

    try {
        // Validation of data
        validateSignUpData(req);

        // Encrypt the password
        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        //console.log(passwordHash);

        // create a new instance of the User
        //const user = new User(req.body);
        const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        }); 
        await user.save();
        res.send("User added successfully!");
    } catch(err) {
        res.status(400).send("ERROR: "+err.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Email is not present");
        } 
        const isPasswordValid = await user.validatePassword(password);
        
        if(isPasswordValid) {
            // Create JWT token
            const token = await user.getJWT();
            //const token = await jwt.sign({ _id: user._id }, "namaste@Dev122", { expiresIn: "1d"});

            // Add the token to cookie and send the response back to user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            res.send("Login successful!");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch(err) {
        res.status(400).send("Error: "+err.message);
    }
});

app.get('/profile', userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    } catch(err) {
        res.status(400).send("Error: "+err.message);
    }
});

app.post('/sendConnectionRequest', userAuth, async (req, res) => {
    const user = req.user;
    // sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName+" sent the connection request");
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

// Delete API - DELETE /user - delete user by Id
app.delete('/user', async (req, res) => {
    const userId = req.body.id;

    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// Update data of the user
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "skills", "about"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        //console.log(isUpdateAllowed);
        if(!isUpdateAllowed) {
            //res.status(400).send("Update not allowed");
            throw new Error("update not allowed");
        }

        if(data?.skills.length > 10) {
            throw new Error("Skills cannot be more than 10");
        }
        const user = await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidators: true,
        });
        res.send("Data updated successfully");
    } catch(err) {
        res.status(400).send("UPDATE failed:" + err.message);
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


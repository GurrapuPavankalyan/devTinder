const express = require('express');
const authRouter = express.Router();
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const validator = require('validator');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const cookieParser = require('cookie-parser');

authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post('/signup', async (req, res) => {
    try {
        // Validation of data
        validateSignUpData(req);

        // Encrypt the password
        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        // create a new instance of the User
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

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Email is not present");
        } 
        const isPasswordValid = await User.validatePassword(password);
        
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

authRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout successfully");
});

module.exports = authRouter;
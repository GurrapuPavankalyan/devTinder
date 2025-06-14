
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


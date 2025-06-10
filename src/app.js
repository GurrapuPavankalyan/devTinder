
const express = require('express');

const app = express();

const { adminAuth, userAuth } = require('./middlewares/auth');

// Handle Auth middleware for all GET, POST, DELETE... requests
app.use('/admin', adminAuth);

app.get('/admin/getAllData', (req, res) => {
    res.send("All Data sent");
});

app.delete('/admin/deleteUser', (req, res) => {
    res.send("Deleted a user");
});

app.get('/user', userAuth, (req, res) => {
    res.send("User Data sent");
});

app.listen(3000, ()=>{
    console.log("Server is started listening successfully!");
});

const express = require('express');

const app = express();

app.use('/', (err, req, res, next) => {
    if(err) {
        // Log your error
        res.status(500).send("something went wrong");
    } 
});

app.get('/getUserData', (req, res) => {
    
    //try {
        // Logic of DB call and get user data
        throw new Error("bncjdjd");
        res.send("User data sent");
    //} catch (err) {
    //    res.status(500).send(err.message);
    //}
});

app.use('/', (err, req, res, next) => {
    if(err) {
        // Log your error
        res.status(500).send("something went wrong");
    } 
});

app.listen(3000, ()=>{
    console.log("Server is started listening successfully!");
});
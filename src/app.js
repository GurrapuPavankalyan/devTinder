
const express = require('express');

const app = express();

app.use(
    '/user', 
    (req, res, next) => {
        console.log("Handling the route user");
        res.send("Response 1");
        next();
    },
    (req, res) => {
        console.log("Handling the route user");
        res.send("Response 2");
    }
);

app.listen(3000, ()=>{
    console.log("Server is started listening successfully!");
});
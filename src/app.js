
const express = require('express');

const app = express();

app.get('/user', (req, res)=>{
    console.log(req.query);
    res.send({firstName: "Pavan Kalyan", lastName: "Gurrapu"});
});

app.get('/user/:userId', (req, res)=>{
    console.log(req.params);
    res.send({firstName: "Pavan Kalyan", lastName: "Gurrapu"});
});

app.post('/user', (req, res)=>{
    res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res)=>{
    res.send("Data deleted successfully form database");
});

app.use('/user', (req, res)=>{
    res.send("Haahahaha");
});

app.listen(3000, ()=>{
    console.log("Server is started listening successfully!");
});
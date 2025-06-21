const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');

app.use('/', authRouter, profileRouter, requestRouter);

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


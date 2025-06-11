const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://PavanKalyanGurrapu:Test1234@namastenode.gudtuhq.mongodb.net/devTinder"
    );
};

module.exports = connectDB;


const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:"+value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong:"+value);
            }
        }
    },
    age: {
        type: Number,
        required: false,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://www.google.com/imgres?q=dummy%20user%20photo&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20190710%2Fourmid%2Fpngtree-user-vector-avatar-png-image_1541962.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Fdummy-image&docid=ktKl-Ggaa_M1wM&tbnid=0EwZuOY4GqQ0aM&vet=12ahUKEwiZ7fHxnvCNAxX1Q2cHHauLDNkQM3oECDgQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwiZ7fHxnvCNAxX1Q2cHHauLDNkQM3oECDgQAA",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL:"+value);
            }
        },
    },
    about: {
        type: String,
        default: "This is a default about of the user",
        minLength: 4,
        maxLength: 50,
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "namaste@Dev122", { expiresIn: "7d"});

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);;
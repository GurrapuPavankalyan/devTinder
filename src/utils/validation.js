const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if(!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    } else if(!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

const validateEditProfileData = (req) => {
    const validItems = ["firstName", "lastName", "age", "skills", "about", "gender", "photoUrl"];

    const isEditValid = Object.keys(req.body).every((item) => validItems.includes(item));

    return isEditValid;
};

const validateEditProfilePassword = (req) => {
    const { password } = req.body;
    //console.log(password);
    const isEditedPasswordValid = validator.isStrongPassword(password);
    //console.log(isEditedPasswordValid);

    return isEditedPasswordValid;
};

module.exports = { validateSignUpData, validateEditProfileData, validateEditProfilePassword };
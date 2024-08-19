const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Static signup Method
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled in')
    }

    //check if email is valid
    if(!validator.isEmail(email)) {
        throw Error ('Email is not valid')
    }

    // Check if password is strong enough
    // By default - min length 8; min lowercase 1; min number 1; min symbol 1
    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email is already in use')
    }

    // Normal Password: mypassword
    // Add Salt: mypasswordj7hg4f6r3 (add slat to end of password)
    // Hash: 64ad45hsad798dhkjs76d45

    // Gen Salt with 10 characters:
    const salt = await bcrypt.genSalt(10);
    // Hash the pasoowrd and salt combined:
    const hash = await bcrypt.hash(password, salt);

    //set the password to the hash value when creating the user:
    const user = await this.create({email, password: hash});

    return user
}

// Static login Mehtod
userSchema.statics.login = async function (email, password) {
    //check if there value for the email and password
    if (!email || !password) {
        throw Error('All fields must be filled in')
    }

    // try find the user in our db with the email
    const user = await this.findOne({email})

    // throw error if no user found
    if (!user) {
        throw Error ('Incorrect Email')
    }

    //compare passwords
    const match = await bcrypt.compare(password, user.password) // return true or false

    // throw an error if they dont match
    if(!match) {
        throw Error('Incorrect Password')
    }

    //if it does match
    return user
}

module.exports = mongoose.model('User', userSchema);
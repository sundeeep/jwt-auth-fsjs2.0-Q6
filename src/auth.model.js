const mongoose = require('mongoose');
require('dotenv').config();
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

//TODO: Create a userSchema where, It takes an Object as an argument, In which you one key is one field... Here(username, email, password, etc.,)
//Todo: userSchema is nothing but a document.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[true, 'username is required'],
        maxLength: [20, "username should be under 20 characters"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, 'Please enter a valid email'],
        unique: true,
    },
    password: {
        type: String,
        required:[true, 'Password is required'],
        minLength: [8, "Password should be atleast 8 characters"],
        select: false,
    },
    role: {
        type: String,
        default: 'user'
    },
    photo: {
        //TODO: Cloudinary Image ID
        id: {
            type: String,
        },
        //TODO: We can get this from Cloudinary
        secure_url: {
            type: String,
        },
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt:{
        type: Date,
        //todo: Don't Call Date.now() here...
        default: Date.now,
    },
})

//TODO: Encryption of Password Before Saving it to the Database...
//todo:: Pre Hook with isModified method. Here, I am writing classic function syntax, since I am refering the password present inside the userSchema, by using 'this' keyword.
userSchema.pre('save', async function(next){
    try {
        //TODO:: If the password is not modified, then don't do encryption and execute next() => go on and save the document into the MongoDB
        if(!this.isModified('password')){
            return next();
        }
        //If the password field is touched or if password is modified, then Encrypt the password as follows...
        this.password = await bcrypt.hash(this.password, 15);

    } catch (error) {
        console.log(error.message)
    }
})

//TODO: Define some methods
/**
 *TODO: Validate the password with passed on user password
 */
userSchema.methods.isValidPassword = async function(signInPassword){
    try{
        return await bcrypt.compare(signInPassword, this.password);
    }catch(error){
        console.log(error.message);
    }
}

//TODO: Inception of JWT Token:: Using MongoDB Document _id as a JWT Token
//todo: It's not an asynchronous method...
userSchema.methods.generateJwtToken = function(){
    return jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
}


module.exports = mongoose.model('User', userSchema);
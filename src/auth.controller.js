const User = require('./auth.model');
const BigPromise = require('./utils/BigPromise');
const generateCookieToken = require('./utils/cookieToken.util.js');

exports.signup = BigPromise(async (req, res, next) => {
    const {username, email, password} = req.body;
    

    if(!username || !email || !password){
        return next(new Error("username, email and password are required!"))
    }

    //Take out the user info from the database...
    const isExistedUser = await User.findOne({ email: email })
    
    if (isExistedUser) {
        throw new Error("User already Exists! SignIn instead of SignUp!");
    }

    const user = await User.create({
        username,
        email,
        password
    });

    generateCookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
    //Take the data fromt the request body...
    const { email, password } = req.body;
    console.log(req.body)

    //Handle the absence of the request body...
    if (!email || !password) {
        throw new Error("Email and Password are compulsory!");
    }

    //Take out the user info from the database...
    const user = await User.findOne({ email: email }).select("+password");

    //Throw an error if the user does not exist in the database...
    if (!user) {
        throw new Error("User does not exist. Kindly Register or SignUp!");
    }

    //Check if the password matches...
    const isPasswordCorrect = user.isValidPassword(password);

    //If the password doesn't matches, then Throw an error...
    if (!isPasswordCorrect) {
        throw new Error("Password is incorrect.");
    }

    //Generate the Cookie Token and Give them a good Response...
    generateCookieToken(user, res);
});
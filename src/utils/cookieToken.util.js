const generateCookieToken = (user, res) => {
    
    const token = user.generateJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000), //days*24hrs*60min*60sec*1000ms
        httpOnly: true, //Server Cookie :: Can only be edited / accessed through server side
    }

    user.password = undefined; //Make the password undefined so that, password wont be shown in the response...

    res.cookie('authToken', token, options).json({
        success: true,
        message: "User Signed In Successfully! :)",
        token,
        loggedInUser:{
            isLogedIn: true,
            credentials: user,
        }
    })
}

module.exports = generateCookieToken;
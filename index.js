const app = require('./src/app.js');
require('dotenv').config();
const mongoose = require("mongoose");

( async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`DB Connected :D`)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    }catch(error){
        console.error("DB Connection Error: ", error);
    }
})()

process.on('uncaughtException', error => {
    console.log(`There was an uncaught error: ${error}`);
    process.exit(1)
})
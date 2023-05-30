const express = require("express");
require('dotenv').config();
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))
app.use(cors());
// //TODO: Cookies 
app.use(cookieParser());

const authRouter = require("./auth.router");

app.use('/auth/', authRouter)
app.get("/", (req, res)=>{
    res.status(404).json({
        success: "true",
        status: "200",
        message: "This is Home Route",
    })
})
app.get("*", (req, res)=>{
    res.status(404).json({
        status: "404 NOT FOUND",
        message: "This resource is invalid",
        success: "false",
    })
})

module.exports = app;
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
app.use('/api/v1/', authRouter)

module.exports = app;
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
app.use(cookieParser());

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || '';
    let verify;
    try {
        if (!token) {
            console.log("no token");
            return res.status(401).json('Invalid token');
        }
        verify = jwt.verify(token, process.env.JWT_SECRET);
        console.log("successful verification");
        //return verify;
        return next();
    } catch (err) {
        res.status(500).json(err.toString());
    }
};


module.exports = verifyToken;
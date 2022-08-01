const router = require("express").Router();
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const generateToken = require("../token/generateToken");
const verifyToken = require("../token/verifyToken");
app.use(bodyParser.json());
require("dotenv").config();
const config = require("../config");

const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
});

let array = [];

//Sign up 

router.post("/signup", [
    check("email", "Email is invalid")
        .isEmail(),
    check("password", "Password needs to be at least 6 characters")
        .isLength({
            min: 6
        })
], async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const errors = validationResult(req)// ensures req.body.email & password are the same as what is outlined in check; will return an array of errors if that is not the case
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    } else {
        db.query("INSERT INTO credentials SET ?", {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            role_id: 1,
        }, async function (err, response) {
            if (err) {
                console.log(err)
            } else {
                console.log(res);
                let array = [];
                const isVerified = await generateToken(res, response[0].customer_id, response[0].name, response[0].email);
                array.push({ customer_id: response[0].customer_id, name: response[0].name, email: response[0].email });
                let user = { id: isVerified.id, email: isVerified.email };
                if (user.id === response[0].customer_id && user.email === response[0].email) {
                    array.push({ customer_id: response[0].customer_id, name: response[0].name, email: response[0].email });
                    res.json({ array: array });
                } else {
                    res.json({ message: err })
                }
            };
        });
    };
});

//Login

router.post("/login", async (req, res) => {
    const plainPassword = req.body.password;
    db.query("SELECT * FROM credentials WHERE email=?", [req.body.email], async (error, response) => {
        let array = [];
        const passwordCheck = bcrypt.compareSync(plainPassword, response[0].password);
        if (passwordCheck) {
            //await generateToken(res, response[0].customer_id, response[0].name, response[0].email)
            //const isVerified = await verifyToken(req, res);
            const isVerified = await generateToken(res, response[0].customer_id, response[0].name, response[0].email)
            console.log({isVerified: isVerified})
            console.log(response)
            let user = { id: isVerified.id, email: isVerified.email };
            if (user.id === response[0].customer_id && user.email === response[0].email) {
                array.push({ 
                    customer_id: response[0].customer_id, 
                    name: response[0].name, 
                    email: response[0].email,
                    role_id: response[0].role_id, 
                });
                res.json({ array: array });
            } else {
                res.json({ message: error })
            }
        } else {
            console.log("incorrect password");
        };
    });
});

//Change password

router.put(`/reset_password`, async (req, res) => {
    const passwordCheck = bcrypt.compareSync(req.body.current_password, array[0].password);
    const hashedPassword = bcrypt.hashSync(req.body.new_password, 10);
    const customer_id = array[0].customer_id;
    if (passwordCheck) {
        db.query(`UPDATE credentials SET password = "${hashedPassword}" WHERE customer_id = "${customer_id}"`, (error, response) => {
            if (error) {
                console.log(error);
                res.send("Passwords do not match");
            } else {
                res.send(response);
            };
        });
    } else {
        res.send("Incorrect password");
    };
});

//Admin sign up


//Logout

router.get("/logout", async (req, res) => {
    res.clearCookie("token", {
        path: '/',
        domain: "localhost",
    }).send('');
});


module.exports = router
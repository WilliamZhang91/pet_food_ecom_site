const router = require("express").Router();
const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");
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
    const token = await jwt.sign({
        email: req.body.email,
    }, "use_env_to_hide_secret", {
        expiresIn: 36000
    });
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    } else {
        db.query("INSERT INTO credentials SET ?", {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
        }, function (err, response) {
            if (err) {
                console.log(err)
            } else {
                console.log("sign up passed");
                console.log(token)
                return res.json({
                    token,
                    response,
                });
            };
        });
    };
});

router.post("/login", async (req, res) => {
    const plainPassword = req.body.password;
    db.query("SELECT * FROM credentials WHERE email=?", [req.body.email], (error, response) => {
        if (error) {
            (error)
        } else {
            array = [];
            const passwordCheck = bcrypt.compareSync(plainPassword, response[0].password)
            if (passwordCheck) {
                const token = jwt.sign({
                    email: req.body.email,
                }, process.env.JWT_SECRET, {
                    expiresIn: 1
                });
                const customer_id = response[0].customer_id
                array.push({
                    customer_id: customer_id,
                    token: token,
                    password: response[0].password
                });
                res
                    .cookie("token", token, {
                        secure: false,
                        httpOnly: true
                    })
                    .json({ message: "success", token, response })
            } else {
                console.log(error);
            };
        };
    });
});

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

module.exports = router
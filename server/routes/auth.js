const router = require("express").Router();
const express = require("express");
const app = express();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require("dotenv").config();
const config = require("../config");
console.log(config)

const db = mysql.createConnection(config)

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
                })
            }
        });
    }
});

router.post("/login", async (req, res) => {
    const plainPassword = req.body.password;
    const token = await jwt.sign({
        email: req.body.email,
    }, "use_env_to_hide_secret", {
        expiresIn: 36000
    });
    db.query("SELECT * FROM credentials Where email =?", [req.body.email], (error, response) => {
        //if (error) {
        //    console.log(error)
        //} 
        //else {
        if (error) {
            console.log(error)
        } else {
            const passwordCheck = bcrypt.compareSync(plainPassword, response[0].password)
            if (passwordCheck) {
                console.log("login passed");
                console.log(response);
                return res.json({
                    token,
                    response,
                });
            } else {
                console.log(error)
            }
        }
        //if (passwordCheck) {
        //    console.log("login passed");
        //    console.log(response);
        //    return res.json({
        //        token,
        //        response,
        //    });
        //} else {
        //    console.log(error)
        //}
        //}
    });

});

module.exports = router
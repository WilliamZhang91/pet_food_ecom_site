const router = require("express").Router();
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

app.use(bodyParser.json());

router.get("/products/dog", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = dog", (err, result) => {
        res.send(result);
    });
});

router.get("/products/cat", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = cat", (err, result) => {
        res.send(result);
    });
});

router.get("/products/bird", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = bird", (err, result) => {
        res.send(result);
    });
});

router.get("/products/rabbit", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = rabbit", (err, result) => {
        res.send(result)
    });
});

router.get("/products/horse", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = horse", (err, result) => {
        res.send(result);
    });
});

router.get("/products/turtle", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = turtle", (err, result) => {
        res.send(result);
    });
});

router.get("/products/fish", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = fish", (err, result) => {
        res.send(result);
    });
});

module.exports = router;
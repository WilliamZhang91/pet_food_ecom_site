const router = require("express").Router();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const config = require("../config");

app.use(bodyParser.json());

const db = mysql.createConnection(config)

router.get("/dog", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = 'dog'", (err, result) => {
        res.send(result);
    });
});

router.get("/cat", (req, res) => {
    db.query("SELECT * FROM dog_food WHERE animal = 'cat'", (err, result) => {
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
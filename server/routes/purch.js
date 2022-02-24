const router = require("express").Router();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

router.get("/purchases", (req, res) => {
    db.query("SELECT * FROM purchases", (err, result) => {
        res.send(result)
    })
})

router.post("/cart", (req, res) => {
    db.query("INSERT INTO purchases Set ?", {
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        //quantity: req.body.quantity,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString([], {
            hourCycle: 'h23',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
    }, (err, result) => {
        res.send(result)
    });
});

module.exports = router;


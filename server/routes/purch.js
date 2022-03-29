const router = require("express").Router();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

router.get("/purchases", (req, res) => {
    db.query("SELECT * FROM purchases", (err, result) => {
        res.send(result);
    });
});

router.post("/cart", (req, res) => {
    for (let i = 0; i < req.body.product_id.length; i++) {
        db.query("INSERT INTO purchases SET ?", {
           customer_id: req.body.customer_id,
           product_id: req.body.product_id[i].id,
           quantity: req.body.product_id[i].quantity,
    
           date: new Date().toISOString().slice(0, 10),
           time: new Date().toLocaleTimeString([], {
               hourCycle: 'h23',
               hour: '2-digit',
               minute: '2-digit',
               second: '2-digit',
           }),
        })
        //console.log(req.body[Object.keys(req.body)[i]].id)
    }
    //console.log(req.body.product_id.length)
    console.log(req.body);
    res.send({message: "success"});
})

module.exports = router;


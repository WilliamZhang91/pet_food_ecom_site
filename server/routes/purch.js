const router = require("express").Router();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const config = require("../config");
const db = mysql.createConnection(config);

//add purchases into db
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
        });
    }
    console.log(req.body);
    res.send({ message: "success" });
});

router.post("/purchases", (req, res) => {
    db.query("SELECT * FROM purchases inner join dog_food on dog_food.product_id = purchases.product_id where ?", {
        customer_id: req.body.customer_id
    }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        };
    });
});

module.exports = router;


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const auth = require("./routes/auth");
const purch = require("./routes/purch");

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to db")
    }
});

app.get("/dog", (req, res) => {
    db.query("SELECT * FROM dog_food", (err, result) => {
        res.send(result)
    });
});

app.use("/auth", auth); //auth = auth

app.use("/purch", purch);

app.listen(process.env.PORT);
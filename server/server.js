const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const auth = require("./routes/auth");
const purch = require("./routes/purch");
const categories = require("./routes/categories");
const config = require("./config");
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection(config);

db.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("connected to db")
    };
});

app.get("/products", (req, res) => {
    db.query("SELECT * FROM dog_food", (err, result) => {
        res.send(result)
    });
});

app.use("/auth", auth); //auth = auth

app.use("/purch", purch);

app.use("/category", categories);

app.listen(process.env.PORT);
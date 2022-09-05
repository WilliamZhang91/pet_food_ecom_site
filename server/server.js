const express = require("express");
const cors = require("cors");
const app = express();
//const allowedOrigins = ["http://localhost:3000"];
//
//const corsOptions = {
//    origin: function (origin, callback) {
//        if (allowedOrigins.indexOf(origin) !== -1) {
//            callback(null, true);
//        } else {
//            var msg =
//                "The CORS policy for this site does not " +
//                "allow access from the specified Origin.";
//            callback(new Error(msg), false);
//        }
//    },
//    optionsSuccessStatus: 200,
//    credentials: true,
//};
//
//app.use(cors(corsOptions));
app.use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const auth = require("./routes/auth");
const purch = require("./routes/purch");
const categories = require("./routes/categories");
const config = require("./config");
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
});

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

app.use("/auth", auth);

app.use("/purch", purch);

app.use("/category", categories);

app.listen(process.env.PORT);
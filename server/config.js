require("dotenv").config();

const host = "127.0.0.1";

const config = {
    //host: "localhost", //prod
    host: "mysqldb", //docker
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

module.exports = config;
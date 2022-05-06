const host = "127.0.0.1";

const config = {
    host: "mysqldb",
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

console.log(config)

module.exports = config
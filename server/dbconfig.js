const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const password = process.env.PASSWORD;
const user = process.env.USER;
const host = process.env.HOST;
const database = process.env.DATABASE;


const exchangeRatePool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: 5432,
});

exchangeRatePool.on("connect", () => {
    console.log("Connected to the PostgreSQL database");
});

exchangeRatePool.on("error", (err) => {
    console.error("Database connection error:", err);
});

module.exports = {
    query: (text, params) => exchangeRatePool.query(text, params),
}
const {Pool} = require('pg');

dotenv.config();
const password = process.env.PASSWORD;
const user = process.env.USER;
const host = process.env.HOST;
const database = process.env.DATABASE;


const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}
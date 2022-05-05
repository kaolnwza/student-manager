const Pool = require("pg").Pool;
require('dotenv').config()
const { DB_HOST, DB_PASSWORD, DB_DATABASE, DB_USER } = require('../config/hot-config')

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: 5432
})

module.exports = pool;


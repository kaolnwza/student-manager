const Pool = require("pg").Pool;

const pool = new Pool({
    user: "ehjmntmf",
    password: "Kz991onZCp2YjkmSR7yEK3BdS-Zj3i7F",
    database: "ehjmntmf",
    host: "tiny.db.elephantsql.com",
    // port: 5432
})

module.exports = pool;
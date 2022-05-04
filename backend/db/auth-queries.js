const pool = require("../db/db")
const ErrorHandling = require("../services/error")

module.exports.getHashedQueries = async (username) => {
    try {
        const query_stm = await pool.query(`SELECT password FROM auth WHERE username = $1`, [username])
        console.log(query_stm.rows[0].password)
        return ErrorHandling(201, query_stm.rows[0].password)

    } catch (error) {
        return ErrorHandling(500, error)
    }

}



const pool = require("../db/db")
const ErrorHandling = require("../services/error")


const GetAllQueries = async (table) => {
    try {
        const query_stm = await pool.query(`SELECT * FROM ${table}`)
        return ErrorHandling(200, query_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }


}

const GetByAnyQueries = async (table, column, values) => {
    try {
        const query_stm = await pool.query(`SELECT * FROM ${table} WHERE ${column} = $1`, [values])
        return ErrorHandling(200, query_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }

}

const GetArrayByAnyQueries = async (table, column, values) => {
    try {
        const query_stm = await pool.query(`SELECT * FROM ${table} WHERE ${column} = $1`, [values])
        return ErrorHandling(200, query_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }

}

const GetByAnyTwoValuesQueries = async (table, column_1, values_1, column_2, values_2) => {
    try {
        const stm = `SELECT * FROM ${table} WHERE ${column_1} = $1 AND ${column_2} = $2`
        const query_stm = await pool.query(stm, [values_1, values_2])
        return ErrorHandling(200, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}




module.exports = { GetAllQueries, GetByAnyQueries, GetByAnyTwoValuesQueries, GetArrayByAnyQueries }
const pool = require("../db/db")


const GetAllQueries = (table) => {
    return pool.query(`SELECT * FROM ${table}`)

}

const GetById = (table, id) => {
    const column = table + '_id'
    console.log(`SELECT * FROM ${table} WHERE ${column} = ${id}`)
    return pool.query(`SELECT * FROM ${table} WHERE ${column} = $1`, [id])
}



module.exports = { GetAllQueries, GetById }
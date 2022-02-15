const pool = require("../db/db")
const ErrorHandling = require("../services/error")

const AddStudentQueries = async (req) => {
    try {
        const column = '(student_id, student_firstname, student_lastname, gender)'
        const values = [req.student_id, req.student_firstname, req.student_lastname, req.gender]
        const query_stm = await pool.query(`INSERT INTO student ${column} VALUES ($1, $2, $3, $4)`, values)

        return ErrorHandling(201, query_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }


}



module.exports = { AddStudentQueries }
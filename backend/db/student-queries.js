const pool = require("../db/db")

const AddStudentQueries = (req) => {


    const column = '(student_id, student_firstname, student_lastname)'
    const values = [req.student_id, req.student_firstname, req.student_lastname]
    const result = pool.query(`INSERT INTO student ${column} VALUES ($1, $2, $3) `, values)
    return result
}

module.exports = { AddStudentQueries }
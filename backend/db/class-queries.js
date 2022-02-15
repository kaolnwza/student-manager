const pool = require("../db/db")
const ErrorHandling = require("../services/error")

module.exports.AddClassStudentQueries = async (class_id, student_id) => {
    try {
        const column = `(class_id,  student_id)`
        const values = [class_id, student_id]
        const query_stm = await pool.query(`INSERT INTO class_student ${column} VALUES ($1, $2)`, values)

        return ErrorHandling(201, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }

}

module.exports.AvailableClassStudentByIdQueries = async (class_id, student_id) => {
    try {
        const condition = `WHERE class_id = $1 AND student_id = $2 AND student_status = $3`
        const values = [class_id, student_id, true]
        const query_stm = await pool.query(`SELECT * FROM class_student ${condition}`, values)

        return ErrorHandling(201, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }

}
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

const GetStudentScoreByClassIdQueries = async (class_id, student_id) => {
    try {
        const stm = `SELECT s.student_id, s.student_firstname, s.student_lastname, 
        cs.score_name, cs.max_score, cs.unit_score "max_unit_score", 
        sc.score_point "student_score", cs.unit_score / cs.max_score * sc.score_point "student_unit_score"
        FROM class AS c
        JOIN class_score AS cs ON c.class_id = cs.class_id
        JOIN student_score AS sc ON sc.score_id = cs.score_id
        JOIN student AS s ON sc.student_id = s.student_id
        WHERE c.class_id = $1 AND s.student_id = $2
        ORDER BY sc.score_id
       `

        const query_stm = await pool.query(stm, [class_id, student_id])

        return ErrorHandling(200, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}

const GetStudentAttendanceByClassIdQueries = async (class_id, student_id) => {
    try {
        const stm = `SELECT ca.attendance_id, ca.attendance_name, 
        sa.student_id, s.student_firstname, s.student_lastname, 
        sa.attendance_status
        FROM class AS c 
        JOIN class_attendance AS ca ON c.class_id = ca.class_id 
        JOIN student_attendance AS sa ON sa.attendance_id = ca.attendance_id
        JOIN student AS s ON s.student_id = sa.student_id
        WHERE c.class_id = $1 AND s.student_id = $2
        ORDER BY ca.attendance_id
       `

        const query_stm = await pool.query(stm, [class_id, student_id])

        return ErrorHandling(200, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}



module.exports = { AddStudentQueries, GetStudentScoreByClassIdQueries, GetStudentAttendanceByClassIdQueries }
const pool = require("../db/db")
const ErrorHandling = require("../services/error")



const GetAttendanceByClassIdQueries = async (class_id) => {
    try {
        const stm = `SELECT ca.attendance_id, ca.attendance_name, sa.student_id, 
       s.student_firstname, s.student_lastname, sa.attendance_status
       FROM class AS c 
       JOIN class_attendance AS ca ON c.class_id = ca.class_id 
       JOIN student_attendance AS sa ON sa.attendance_id = ca.attendance_id
       JOIN student AS s ON s.student_id = sa.student_id
       WHERE c.class_id = $1
       `

        const query_stm = await pool.query(stm, [class_id])

        return ErrorHandling(200, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}




module.exports = { GetAttendanceByClassIdQueries }


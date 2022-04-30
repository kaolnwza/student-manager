const pool = require("../db/db")
const ErrorHandling = require("../services/error")

const AddClassAttendanceQueries = async (req) => {

    try {
        const column = `(class_id, attendance_name)`
        const values = [req.class_id, req.attendance_name]
        const attendance_stm = await pool.query(`
        INSERT INTO class_attendance ${column} 
        VALUES ($1, $2) 
        RETURNING attendance_id`, values)

        return ErrorHandling(201, attendance_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }

}

const AddClassStudentAttendanceQueries = async (req, attendance_id) => {

    try {

        const student_stm = await pool.query(`
        INSERT INTO student_attendance (attendance_id, student_id, attendance_status)  
        SELECT $1, student_id, 'notcome' 
        FROM class_student 
        WHERE class_student.class_id = $2`, [attendance_id, req.class_id])

        return ErrorHandling(201, student_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }

}

const UpdateStudentAttendanceQueries = async (req) => {
    try {
        const query_stm = await pool.query(`
        UPDATE student_attendance 
        SET attendance_status = $1, attendance_note = $2 
        WHERE attendance_id = $3
        AND student_id = $4`,
            [req.attendance_status, req.attendance_note, req.attendance_id, req.student_id])

        return ErrorHandling(200, query_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }
}

const GetAttendanceByClassIdQueries = async (class_id) => {
    try {
        const stm = `SELECT ca.attendance_id, ca.attendance_name, 
        sa.student_id, s.student_firstname, s.student_lastname, 
        sa.attendance_status, sa.attendance_note 
        FROM class AS c 
        JOIN class_attendance AS ca ON c.class_id = ca.class_id 
        JOIN student_attendance AS sa ON sa.attendance_id = ca.attendance_id
        JOIN student AS s ON s.student_id = sa.student_id
        WHERE c.class_id = $1
        ORDER BY ca.attendance_id, s.student_id
       `

        const query_stm = await pool.query(stm, [class_id])

        return ErrorHandling(200, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}




module.exports = { GetAttendanceByClassIdQueries, AddClassAttendanceQueries, AddClassStudentAttendanceQueries, UpdateStudentAttendanceQueries }


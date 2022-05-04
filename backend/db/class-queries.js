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

module.exports.GetAllClassByStudentIdQueries = async (student_id) => {
    try {
        const query_stm = await pool.query(`
        select c.class_id, c.dayweek, c.time_start, c.time_end, 
        s.subject_id, s.subject_name, 
        t.teacher_firstname, t.teacher_lastname, 
        std.student_id from class as c 
        join subject as s on c.subject_id = s.subject_id 
        join teacher as t on s.teacher_id = t.teacher_id 
        join class_student as cs on c.class_id = cs.class_id 
        join student as std on std.student_id = cs.student_id 
        where std.student_id = $1;`, [student_id])

        return ErrorHandling(200, query_stm.rows)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}
module.exports.GetAllClassDetailByStudentIdQueries = async (student_id, subject_id) => {
    try {
        const query_stm = await pool.query(`
        select c.class_id, c.dayweek, c.time_start, c.time_end, 
        s.subject_id, s.subject_name, 
        t.teacher_firstname, t.teacher_lastname, 
        std.student_id, std.student_firstname, std.student_lastname 
        from class as c 
        join subject as s on c.subject_id = s.subject_id 
        join teacher as t on s.teacher_id = t.teacher_id 
        join class_student as cs on c.class_id = cs.class_id 
        join student as std on std.student_id = cs.student_id 
        where std.student_id = $1 and s.subject_id = $2;`, [student_id, subject_id])

        return ErrorHandling(200, query_stm.rows)

    } catch (error) {
        console.log(error)
        return ErrorHandling(500, error)
    }


}
const pool = require("../db/db")
const ErrorHandling = require("../services/error")

module.exports.AddStudentScoreQueries = async (req) => {

    try {
        const column = `(score_id, student_id, score_point)`
        const values = [req.score_id, req.student_id, req.score_point]
        const query_stm = await pool.query(`INSERT INTO student_score ${column} VALUES ($1, $2, $3)`, values)
        return ErrorHandling(201, query_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }

}
module.exports.AddClassScoreQueries = async (req) => {

    try {
        const column = `( class_id, score_name, max_score, unit_score)`
        const values = [req.class_id, req.score_name, req.max_score, req.unit_score]
        const score_stm = await pool.query(`
        INSERT INTO class_score ${column} 
        VALUES ($1, $2, $3, $4) 
        RETURNING score_id`, values)

        return ErrorHandling(201, score_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }


}

module.exports.UpdateStudentScoreQueries = async (req) => {
    try {
        const query_stm = await pool.query(`
        UPDATE student_score 
        SET score_point = $1, score_note = $4
        WHERE score_id = $2
        AND student_id = $3
        AND $1 <= (SELECT max_score FROM class_score WHERE score_id = $2) `,
            [req.student_score, req.score_id, req.student_id, req.score_note])

        return ErrorHandling(200, query_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }
}

module.exports.AddClassStudentScoreQueries = async (req, score_id) => {

    try {
        //insert all student in this class
        const student_stm = await pool.query(`
        INSERT INTO student_score (score_id, student_id, score_point)  
        SELECT $1, student_id, 0 
        FROM class_student 
        WHERE class_student.class_id = $2`, [score_id, req.class_id])

        return ErrorHandling(201, student_stm)
    } catch (error) {
        return ErrorHandling(500, error)
    }
}

module.exports.GetScoreByClassIdQueries = async (class_id) => {
    try {
        const stm = `SELECT s.student_id, s.student_firstname, s.student_lastname, 
        cs.score_name, cs.max_score, cs.unit_score "max_unit_score", cs.score_id,
        sc.score_point "student_score", cs.unit_score / cs.max_score * sc.score_point "student_unit_score"
        FROM class AS c
        JOIN class_score AS cs ON c.class_id = cs.class_id
        LEFT JOIN student_score AS sc ON sc.score_id = cs.score_id
        LEFT JOIN student AS s ON sc.student_id = s.student_id
        WHERE c.class_id = $1
        ORDER BY cs.score_id, s.student_id
       `

        const query_stm = await pool.query(stm, [class_id])

        return ErrorHandling(200, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}


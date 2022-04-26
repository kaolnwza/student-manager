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
        const query_stm = await pool.query(`INSERT INTO class_score ${column} VALUES ($1, $2, $3, $4)`, values)
        return ErrorHandling(201, query_stm)
    } catch (error) {
        return ErrorHandling(500, query_stm)
    }

}


const pool = require("../db/db")
const ErrorHandling = require("../services/error")



const GetSubjectByIdQueries = async (subject_id) => {
    try {
        const selected_stm = `s.subject_name, t.teacher_firstname, t.teacher_lastname, c.class_id, c.dayweek, c.time_start, c.time_end`
        const first_join = `join teacher as t on s.teacher_id = t.teacher_id`
        const second_join = `join class as c on c.subject_id = s.subject_id`
        const stm = `select ${selected_stm} from subject as s ${first_join} ${second_join} where s.subject_id = $1;`

        const query_stm = await pool.query(stm, [subject_id])

        return ErrorHandling(200, query_stm)

    } catch (error) {
        return ErrorHandling(500, error)
    }


}




module.exports = { GetSubjectByIdQueries }


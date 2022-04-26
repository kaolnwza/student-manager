const get_queries = require("../db/get-queries")
const ErrorHandling = require("../services/error")


//check available student is in db
module.exports.AvaliableStudent = async (req) => {
    const resp = await get_queries.GetByAnyQueries("student", "student_id", req.student_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg.rowCount == 0) {
        return ErrorHandling(400, "This student id is not available in database.")
    }
    else if (resp.msg.rows[0].student_status == false) {
        return ErrorHandling(400, "Student status is false.")
    }

    return ErrorHandling(200, null)
}

//check duplicate student
module.exports.DuplicateStudent = async (req) => {
    const resp = await get_queries.GetByAnyQueries("student", "student_id", req.student_id)

    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    else if (resp.msg.rowCount > 0) {
        return ErrorHandling(400, "Student is duplicates.")
    }

    return ErrorHandling(200, null)
}

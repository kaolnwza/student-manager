const db = require("../db/subject-queries")
const ErrorHandling = require("./error")

const GetSubjectById = async (subject_id) => {

    var resp = await db.GetSubjectByIdQueries(subject_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    return ErrorHandling(200, resp.msg.rows)

}


module.exports = { GetSubjectById }
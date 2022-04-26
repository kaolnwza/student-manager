const get_queries = require("../db/get-queries")
const ErrorHandling = require("../services/error")
const student_validate = require("./student-validates")
const class_validate = require("./class-validates")
const get_services = require("../services/get-services")

//prepare validation add student score services
module.exports.AddStudentScore = async (req) => {
    const student_vld = await student_validate.AvaliableStudent(req)
    if (student_vld.err != 200) {
        return student_vld
    }

    const score_vld = await this.AvailableScore(req)
    if (score_vld.err != 200) {
        return score_vld
    }

    const duplicate_score_vld = await this.DuplicateStudentScore(req)
    if (duplicate_score_vld.err != 200) {
        return duplicate_score_vld
    }

    return ErrorHandling(200, null)
}

//prepare validation for add class score services
module.exports.AddClassScore = async (req) => {
    const class_vld = await class_validate.AvailableClass(req)
    if (class_vld.err != 200) {
        return class_vld
    }

    const duplicate_score_name_vld = await this.DuplicateScoreName(req)
    if (duplicate_score_name_vld.err != 200) {
        return duplicate_score_name_vld
    }

    return ErrorHandling(200, null)
}

//check duplicate student score
module.exports.DuplicateStudentScore = async (req) => {
    const resp = await get_services.GetByAnyTwoValues("student_score", "score_id", req.score_id, "student_id", req.student_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg != undefined) {
        return ErrorHandling(400, "Score has duplicate.")
    }

    return ErrorHandling(200, null)
}

//check avaliable class in db
module.exports.AvailableScore = async (req) => {
    const resp = await get_queries.GetByAnyQueries("class_score", "score_id", req.score_id)

    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg.rowCount == 0) {
        return ErrorHandling(400, "This score is not available in database.")
    }

    return ErrorHandling(200, resp.msg)
}

//check duplicate score name
module.exports.DuplicateScoreName = async (req) => {
    const resp = await get_services.GetByAny("class_score", "score_name", req.score_name)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg != undefined) {
        return ErrorHandling(400, "Score name has duplicate.")
    }

    return ErrorHandling(200, null)


}
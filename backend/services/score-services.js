const score_queries = require("../db/score-queries")

const get_services = require("./get-services")
const class_services = require("./class-services")
const ErrorHandling = require("./error")
const score_vld = require("../validates/score-validates")

module.exports.AddStudentScore = async (req) => {
    //parse float for invalid input
    req.score_id = parseFloat(req.score_id)

    const validation = await score_vld.AddStudentScore(req)
    if (validation.err != 200) {
        return ErrorHandling(400, validation.msg)
    }

    const resp = await score_queries.AddStudentScoreQueries(req)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    return ErrorHandling(201, resp)


}


module.exports.AddClassScore = async (req) => {
    
    const validation = await score_vld.AddClassScore(req)
    if (validation.err != 200) {
        return ErrorHandling(400, validation.msg)
    }

    const resp = await score_queries.AddClassScoreQueries(req)
    if (resp.err != 201) {
        return ErrorHandling(500, resp.msg)
    }

    return ErrorHandling(201, resp)



}
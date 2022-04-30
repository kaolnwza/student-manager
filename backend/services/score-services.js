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
module.exports.UpdateStudentScore = async (req) => {


    const resp = await score_queries.UpdateStudentScoreQueries(req)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    return ErrorHandling(200, resp)


}


module.exports.AddClassScore = async (req) => {
    const validation = await score_vld.AddClassScore(req)
    if (validation.err != 200) {
        return ErrorHandling(400, validation.msg)
    }

    const class_resp = await score_queries.AddClassScoreQueries(req)
    if (class_resp.err != 201) {
        return ErrorHandling(500, class_resp.msg)
    }

    const std_resp = await score_queries.AddClassStudentScoreQueries(req, class_resp.msg.rows[0].score_id)
    if (std_resp.err != 201) {
        return ErrorHandling(500, std_resp.msg)
    }

    return ErrorHandling(201, std_resp)



}

module.exports.GetScoreByClassId = async (class_id) => {

    var resp = await score_queries.GetScoreByClassIdQueries(class_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    var filtered_by_week = await FilterScoreByWeek(resp.msg.rows)

    return ErrorHandling(200, filtered_by_week)

}


const FilterScoreByWeek = async (resp_arr) => {
    //format by attendance_id
    if (resp_arr.length == 0) {
        return {}
    }
    var temp = resp_arr[0].score_id
    var filter_by_week = []
    var arr = []

    resp_arr.forEach((x, index) => {
        if (x.score_id != temp) {
            filter_by_week.push(arr)
            arr = []
            temp = x.score_id
        }
        arr.push(x)

    });
    //push finally arr
    filter_by_week.push(arr)

    return filter_by_week


}
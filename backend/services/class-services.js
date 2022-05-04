const class_queries = require("../db/class-queries")
const get_queries = require("../db/get-queries")
const ErrorHandling = require("./error")
const validation = require("../validates/class-validates")



module.exports.AddClassStudent = async (req) => {
    //validation
    const class_vld = await validation.AddClassStudentValidation(req)
    if (class_vld.err != 200) {
        return class_vld
    }

    //add student to class
    const resp = await class_queries.AddClassStudentQueries(req.class_id, req.student_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    return ErrorHandling(201, resp.msg)
}

module.exports.GetAllClassByStudentId = async (student_id) => {

    const resp = await class_queries.GetAllClassByStudentIdQueries(student_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    return ErrorHandling(200, resp.msg)
}
module.exports.GetAllClassDetailByStudentId = async (student_id, subject_id) => {

    const resp = await class_queries.GetAllClassDetailByStudentIdQueries(student_id, subject_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    return ErrorHandling(200, resp.msg)
}

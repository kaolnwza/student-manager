const get_queries = require("../db/get-queries")
const ErrorHandling = require("../services/error")
const student_validate = require("./student-validates")


//encap
module.exports.AddClassStudentValidation = async (req) => {
    const available_class_vld = await this.AvailableClass(req)
    if (available_class_vld.err != 200) {
        return available_class_vld
    }

    const student_vld = await student_validate.AvaliableStudent(req)
    if (student_vld.err != 200) {
        return student_vld
    }

    const duplicate_class_student_vld = await this.DuplicateClassStudent(req)
    if (duplicate_class_student_vld.err != 200) {
        return duplicate_class_student_vld
    }

    return ErrorHandling(200, null)


}

//check avaliable class in db
module.exports.AvailableClass = async (req) => {
    const resp = await get_queries.GetByAnyQueries("class", "class_id", req.class_id)

    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg.rowCount == 0) {
        return ErrorHandling(400, "This class is not available in database.")
    }

    return ErrorHandling(200, resp.msg)
}


//check if this student is already in class
module.exports.DuplicateClassStudent = async (req) => {
    const resp = await get_queries.GetByAnyTwoValuesQueries("class_student", "class_id", req.class_id, "student_id", req.student_id)

    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg.rowCount != 0) {
        return ErrorHandling(400, "Student in this class is duplicate.")
    }

    return ErrorHandling(200, resp.msg)
}

//check duplicate class
module.exports.DuplicateClass = async (req) => {
    const resp = await get_queries.GetByAnyQueries("class", "class_id", req.class_id)

    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg.rowCount > 0) {
        return ErrorHandling(400, "Student in this class is duplicate.")
    }

    return ErrorHandling(200, resp.msg)
}

module.exports.AvailableClassStudent = async (req) => {
    const resp = await get_queries.GetByAnyTwoValuesQueries("class_student", "class_id", req.class_id, "student_id", req.student_id)

    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg.rowCount == 0) {
        return ErrorHandling(400, "Student in not in class.")
    }
    else if (resp.msg.rowCount > 1) {
        return ErrorHandling(400, "Student in this class is duplicate.")
    }

    return ErrorHandling(200, null)
}
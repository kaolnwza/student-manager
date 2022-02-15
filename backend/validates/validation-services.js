const class_queries = require("../db/class-queries")
const get_queries = require("../db/get-queries")
const ErrorHandling = require("../services/error")



module.exports.AddClassValidation = async (req) => {

}

module.exports.AvailableClass = async (req) => {
    const avialable_class = await get_queries.GetByAnyQueries("class", "class_id", req.class_id)
    if (avialable_class.err != 200) {
        return ErrorHandling(500, avialable_class.msg)
    }
    else if (avialable_class.msg.rowCount == 0) {
        return ErrorHandling(400, "This class is not available in database.")
    }
}


//check if this student is already in class
module.exports.DuplicateClassStudent = async (req) => {
    const duplicate_student = await get_queries.GetByAnyTwoValuesQueries("class_student", "class_id", req.class_id, "student_id", req.student_id)
    console.log(duplicate_student.err)
    if (duplicate_student.err != 200) {
        return ErrorHandling(500, duplicate_student.msg)
    }
    else if (duplicate_student.msg.rowCount != 0) {
        return ErrorHandling(400, "Duplicate student.")
    }
}
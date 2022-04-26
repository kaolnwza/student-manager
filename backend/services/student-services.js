const student_db = require("../db/student-queries")
const get_db = require("../db/get-queries")
const ErrorHandling = require("./error")
const validation = require("../validates/student-validates")


const AddStudent = async (req) => {

    //validate student
    const student_vld = await validation.DuplicateStudent(req)
    if (student_vld.err != 200) {
        return student_vld
    }

    //add to db
    const resp = await student_db.AddStudentQueries(req)
    if (resp.err != 201) {
        return ErrorHandling(500, resp.msg)
    }

    return ErrorHandling(201, "Add student success.")


}



module.exports = { AddStudent }
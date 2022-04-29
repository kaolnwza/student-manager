const get_queries = require("../db/get-queries")
const ErrorHandling = require("../services/error")
const student_validate = require("./student-validates")
const class_validate = require("./class-validates")
const get_services = require("../services/get-services")


//prepare validation for add class attendance services
module.exports.AddClassAttendance = async (req) => {

    const duplicate_attendance_name_vld = await this.DuplicateAttendanceName(req)
    if (duplicate_attendance_name_vld.err != 200) {
        return duplicate_attendance_name_vld
    }

    return ErrorHandling(200, null)
}



//check duplicate score name
module.exports.DuplicateAttendanceName = async (req) => {
    const resp = await get_services.GetByAny("class_attendance", "attendance_name", req.attendance_name)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    else if (resp.msg != undefined) {
        return ErrorHandling(400, "Attendance name has duplicate.")
    }

    return ErrorHandling(200, null)


}
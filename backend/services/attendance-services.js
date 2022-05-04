const db = require("../db/attendance-queries")
const ErrorHandling = require("./error")
const attendance_vld = require("../validates/attendance-validates")

const AddClassAttendance = async (req) => {

    // const validation = await attendance_vld.AddClassAttendance(req)
    // if (validation.err != 200) {
    //     return ErrorHandling(400, validation.msg)
    // }

    const class_resp = await db.AddClassAttendanceQueries(req)
    if (class_resp.err != 201) {
        return ErrorHandling(500, class_resp.msg)
    }

    const std_resp = await db.AddClassStudentAttendanceQueries(req, class_resp.msg.rows[0].attendance_id)
    if (std_resp.err != 201) {
        return ErrorHandling(500, std_resp.msg)
    }

    return ErrorHandling(201, std_resp)

}

const UpdateStudentAttendance = async (req) => {


    const resp = await db.UpdateStudentAttendanceQueries(req)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }


    return ErrorHandling(201, resp.msg)



}

const GetAttendanceByClassId = async (class_id) => {

    var resp = await db.GetAttendanceByClassIdQueries(class_id)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    var filtered_by_week = await FilterAttendanceByWeek(resp.msg.rows)

    return ErrorHandling(200, filtered_by_week)

}


const FilterAttendanceByWeek = async (resp_arr) => {
    //format by attendance_id
    if (resp_arr.length == 0) {
        return {}
    }

    var temp = resp_arr[0].attendance_id
    var filter_by_week = []
    var arr = []

    resp_arr.forEach((x, index) => {
        if (x.attendance_id != temp) {
            filter_by_week.push(arr)
            arr = []
            temp = x.attendance_id
        }
        arr.push(x)

    });
    //push finally arr
    filter_by_week.push(arr)

    return filter_by_week


}

module.exports = { GetAttendanceByClassId, AddClassAttendance, UpdateStudentAttendance }
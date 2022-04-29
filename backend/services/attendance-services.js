const db = require("../db/attendance-queries")
const ErrorHandling = require("./error")

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

module.exports = { GetAttendanceByClassId }
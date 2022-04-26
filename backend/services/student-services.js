const db = require("../db/student-queries")
const ErrorHandling = require("./error")



const AddStudent = async (req) => {

    try {
        //check available student id
        const count_student = await db.GetStudentByIdQueries(req)
        if (count_student.rows[0].count != 0) {
            return ErrorHandling(400, "This student id has been on database.")
        }

        //add to db
        await db.AddStudentQueries(req)
        return ErrorHandling(201, "Add student success.")
    } catch (error) {
        return ErrorHandling(500, error)
    }

}


module.exports = { AddStudent }
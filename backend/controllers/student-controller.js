const express = require('express')
const router = express.Router()
const services = require("../services/student-services")
const { AuthenticationToken } = require("../middleware/auth-middleware")


router.post("/add", AuthenticationToken('admin'), async (req, res) => {
    const resp = await services.AddStudent(req.body)
    res.status(resp.err).send(resp.msg)
})


router.get("/score/:class_id/:student_id", AuthenticationToken('student'), async (req, res) => {
    const class_id = req.params["class_id"]
    const student_id = req.params["student_id"]

    const resp = await services.GetStudentScoreByClassId(class_id, student_id)
    res.status(resp.err).send(resp.msg)
})

router.get("/attendance/:class_id/:student_id", AuthenticationToken('student'), async (req, res) => {
    const class_id = req.params["class_id"]
    const student_id = req.params["student_id"]

    const resp = await services.GetStudentAttendanceByClassId(class_id, student_id)
    res.status(resp.err).send(resp.msg)
})

module.exports = router
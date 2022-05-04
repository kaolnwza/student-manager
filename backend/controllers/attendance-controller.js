const express = require('express')
const router = express.Router()
const services = require("../services/attendance-services")
const { AuthenticationToken } = require("../middleware/auth-middleware")

router.post("/addclass", AuthenticationToken('teacher'), async (req, res) => {
    const resp = await services.AddClassAttendance(req.body)

    res.status(resp.err).send(resp.msg)
})

router.put("/update_student", AuthenticationToken('teacher'), async (req, res) => {
    const resp = await services.UpdateStudentAttendance(req.body)


    res.status(resp.err).send(resp.msg)
})

router.get("/class/:class_id", async (req, res) => {
    const class_id = req.params["class_id"]

    const resp = await services.GetAttendanceByClassId(class_id)
    res.status(resp.err).send(resp.msg)
})

module.exports = router
const express = require('express')
const router = express.Router()
const services = require("../services/class-services")


router.post("/addstudent", async (req, res) => {
    const resp = await services.AddClassStudent(req.body)

    res.status(resp.err).send(resp.msg)
})

router.get("/student/:student_id", async (req, res) => {
    const student_id = req.params['student_id']
    const resp = await services.GetAllClassByStudentId(student_id)

    res.status(resp.err).send(resp.msg)
})
router.get("/student/:student_id/subject/:subject_id", async (req, res) => {
    const student_id = req.params['student_id']
    const subject_id = req.params['subject_id']
    const resp = await services.GetAllClassDetailByStudentId(student_id, subject_id)

    res.status(resp.err).send(resp.msg)
})

router.get("/availablestudent/:class_id/:student_id", async (req, res) => {
    const class_id = req.params["class_id"]
    const student_id = req.params["student_id"]

    const resp = await services.AvailableClassStudentById(class_id, student_id)
    res.status(resp.err).send(resp.msg)
})
// router.post("/addstudent", services.AddStudent)

module.exports = router
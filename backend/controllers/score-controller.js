const express = require('express')
const router = express.Router()
const services = require("../services/score-services")
const { AuthenticationToken } = require("../middleware/auth-middleware")

router.post("/addstudent", AuthenticationToken('admin'), async (req, res) => {
    const resp = await services.AddStudentScore(req.body)

    res.status(resp.err).send(resp.msg)
})

router.post("/addclass", AuthenticationToken('teacher'), async (req, res) => {
    const resp = await services.AddClassScore(req.body)

    res.status(resp.err).send(resp.msg)
})

router.put("/update_student", AuthenticationToken('teacher'), async (req, res) => {
    const resp = await services.UpdateStudentScore(req.body)

    res.status(resp.err).send(resp.msg)
})

router.get("/class/:class_id", async (req, res) => {
    const class_id = req.params["class_id"]

    const resp = await services.GetScoreByClassId(class_id)
    res.status(resp.err).send(resp.msg)
})


module.exports = router
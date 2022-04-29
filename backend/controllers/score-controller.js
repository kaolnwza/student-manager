const express = require('express')
const router = express.Router()
const services = require("../services/score-services")

router.post("/addstudent", async (req, res) => {
    const resp = await services.AddStudentScore(req.body)

    res.status(resp.err).send(resp.msg)
})

router.post("/addclass", async (req, res) => {
    const resp = await services.AddClassScore(req.body)

    res.status(resp.err).send(resp.msg)
})

router.get("/class/:class_id", async (req, res) => {
    const class_id = req.params["class_id"]

    const resp = await services.GetScoreByClassId(class_id)
    res.status(resp.err).send(resp.msg)
})


module.exports = router
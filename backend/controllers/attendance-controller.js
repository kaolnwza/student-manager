const express = require('express')
const router = express.Router()
const services = require("../services/attendance-services")


router.get("/class/:class_id", async (req, res) => {
    const class_id = req.params["class_id"]

    const resp = await services.GetAttendanceByClassId(class_id)
    res.status(resp.err).send(resp.msg)
})

module.exports = router
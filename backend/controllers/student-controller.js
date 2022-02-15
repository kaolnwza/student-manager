const express = require('express')
const router = express.Router()
const services = require("../services/student-services")



router.post("/add", async (req, res) => {
    const resp = await services.AddStudent(req.body)
    res.status(resp.err).send(resp.msg)
})


module.exports = router
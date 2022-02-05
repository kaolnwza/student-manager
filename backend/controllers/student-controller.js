const express = require('express')
const router = express.Router()
const services = require("../services/student-services")
// const services = require("../services/student-services")





router.post("/add/:nn", async (req, res) => {
    const result = await services.AddStudent(req.body)
    res.status(result.err).send(result)
})

// router.use((err, req, res, next) => {
//     return res.status()
// })
module.exports = router
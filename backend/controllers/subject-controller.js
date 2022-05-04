const express = require('express')
const router = express.Router()
const services = require("../services/subject-services")


router.get("/detail/:subject_id", async (req, res) => {
    const subject_id = req.params["subject_id"]

    const resp = await services.GetSubjectById(subject_id)
    console.log(req.body);
    res.status(resp.err).send(resp.msg)
})

module.exports = router
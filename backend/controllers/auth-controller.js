const express = require('express')
const router = express.Router()
const services = require("../services/auth-services")
const { AuthenticationToken } = require("../middleware/auth-middleware")

router.post("/login", async (req, res) => {
    console.log('isin')
    console.log(req.body)
    const resp = await services.Login(req.body)

    res.cookie('token', resp.msg)

    // console.log(req.cookies.token)


    console.log(resp.msg)
    // console.log(req.headers.cookie.token)
    res.status(resp.err).json(resp.msg)
})

router.get("/test", async (req, res) => {
    res.json("kuy prayuth")
})

router.get("/role/:token", AuthenticationToken(['student', 'teacher']), async (req, res) => {
    const role = services.GetPayloadRole(req.params['token'])

    res.json(role)
})
module.exports = router
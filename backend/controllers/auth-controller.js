const express = require('express')
const router = express.Router()
const services = require("../services/auth-services")
const { AuthenticationToken } = require("../middleware/auth-middleware")
require('dotenv').config()
const { FRONTEND_IP } = require('../config/hot-config')

router.post("/login", async (req, res) => {
    console.log('isin')
    console.log(req.body)
    const resp = await services.Login(req.body)

    res.cookie('token', "")
    res.cookie('token', resp.msg)

    // console.log(req.cookies.token)


    console.log(resp.msg)
    // console.log(req.headers.cookie.token)
    res.status(resp.err).json(resp.msg)
})

router.get("/ip", async (req, res) => {
    console.log(FRONTEND_IP)
    res.json(FRONTEND_IP + '')
})

router.get("/test", async (req, res) => {

    res.json("running")
})

router.get("/role/:token", AuthenticationToken(['student', 'teacher']), async (req, res) => {
    const role = services.GetPayloadRole(req.params['token'])

    res.json(role)
})
module.exports = router
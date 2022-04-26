const express = require('express')
const router = express.Router()
const services = require("../services/auth-services")
const { AuthenticationToken } = require("../middleware/auth-middleware")

router.post("/login", async (req, res) => {
    resp = await services.CreateAccessToken(req)


    res.status(resp.err).json(resp.msg)
})

router.get("/test", async (req, res) => {
    res.json("kuy prayuth")
})

module.exports = router
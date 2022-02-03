const express = require('express')
const router = express.Router()
const services = require("../services/class-services")


router.post("/addstudent", services.AddStudent)

module.exports = router
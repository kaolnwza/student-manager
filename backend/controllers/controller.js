const express = require('express')
const router = express.Router()
const student_controller = require("./student-controller")
const class_controller = require("./class-controller")
const util_services = require("../services/util-services")

router.use("/student", student_controller)

router.use("/class", class_controller)

//simple get for every table
router.get('/:table/getall', util_services.GetAll)
router.get('/:table/getbyid/:id', util_services.GetById)


module.exports = router
const express = require('express')
const router = express.Router()
const student_controller = require("./student-controller")
const class_controller = require("./class-controller")
const score_controller = require("./score-controller")
const get_controller = require("./get-controller")

router.use("/student", student_controller)

router.use("/class", class_controller)

router.use("/score", score_controller)

router.use("/util", get_controller)
// router.use("/score", score_controller)



module.exports = router
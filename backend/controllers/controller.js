const express = require('express')
const router = express.Router()
const student_controller = require("./student-controller")
const class_controller = require("./class-controller")
const score_controller = require("./score-controller")
const get_controller = require("./get-controller")
const auth_controller = require("./auth-controller")
const { AuthenticationToken } = require("../middleware/auth-middleware")

router.use("/student", AuthenticationToken(["admin", 'teacher', 'student']), student_controller)

router.use("/class", AuthenticationToken(["admin", 'teacher']), class_controller)

router.use("/score", AuthenticationToken(["admin", 'teacher']), score_controller)

router.use("/util", AuthenticationToken(["admin", 'teacher']), get_controller)

router.use("/auth", auth_controller)
// router.use("/score", score_controller)



module.exports = router
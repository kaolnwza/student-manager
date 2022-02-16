require('dotenv').config()

const ErrorHandling = require("./error")
const jwt = require("jsonwebtoken")


const CreateAccessToken = async (req) => {
    const payload = {
        username: "prayuth",
        role: "admin"
    }

    const accessToken = GenerateAccessToken(payload)

    return ErrorHandling(200, accessToken)
}

const GenerateAccessToken = (req) => {
    return jwt.sign(req, process.env.SECRET_KEY, { expiresIn: '60567567567567567m' })
}

module.exports = { CreateAccessToken }
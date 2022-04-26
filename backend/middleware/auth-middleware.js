require('dotenv').config()
const ErrorHandling = require("../services/error")
const jwt = require("jsonwebtoken")
const { createSSRApp } = require('vue')


const AuthenticationToken = (credentials) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization']
        if (authHeader == null) {
            return res.status(401).json("no token dog")
        }

        const token = authHeader.slice(7)

        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) {
                return res.status(401).json(`token err dog : ${err}`)
            }
            else if (!credentials.includes(payload.role)) {
                return res.status(401).json(`No Permissoon`)
            }
            next()
        })

    }
}




module.exports = { AuthenticationToken }

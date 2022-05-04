require('dotenv').config()
const bcrypt = require('bcrypt')
const ErrorHandling = require("./error")
const jwt = require("jsonwebtoken")
const queries = require('../db/auth-queries')
const get_services = require('../services/get-services')

const CreateAccessToken = (user, role) => {
    const payload = {
        user: user,
        role: role
    }

    const accessToken = GenerateAccessToken(payload)

    return accessToken
}

const GenerateAccessToken = (req) => {
    return jwt.sign(req, process.env.SECRET_KEY, { expiresIn: '60567567567567567m' })
}



const comparePassword = async (password, username) => {
    const hashed_password = await getHashedPassword(username)
    bcrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
            return true
        }
        else {
            return false
        }
    });
}

const getHashedPassword = async (username) => {
    const hashed_password = await queries.getHashedQueries(username)
    return hashed_password.msg

}

const Login = async (req) => {


    const auth_info = await get_services.GetByAny('auth', 'username', req.username)
    if (auth_info.msg == null) {
        return ErrorHandling(400, "User not found")
    }

    const password_check = comparePassword(auth_info.msg.username)
    if (!password_check) {
        return ErrorHandling(403, 'Wrong password')
    }

    const user = await get_services.GetByAny(auth_info.msg.auth_role, 'auth_id', auth_info.msg.auth_id)

    const token = CreateAccessToken(user.msg, auth_info.msg.auth_role)

    // console.log(jwt.decode(token).role)

    return ErrorHandling(200, token)
}

const GetPayloadRole = (token) => {
    const role = jwt.decode(token)
    return role
}

module.exports = { CreateAccessToken, Login, GetPayloadRole }
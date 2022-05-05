const express = require('express')


const SECRET_KEY = "83e3ae96c6e3fb8cc7017581f6446a6f88bb90ed45160b2878a4b4a778bfc57c4eb072d97337900a8c14c349e9ae350c7260021d2dbdaa2cb55f6b4b740caa8b"

const DB_HOST = "student-manager.cbxd92yq9og8.us-east-1.rds.amazonaws.com"
const DB_PASSWORD = "supersaiya55"
const DB_DATABASE = "postgres"
const DB_USER = "postgres"

const FRONTEND_IP = "49.49.222.58"
// const FRONTEND_IP = "54.91.120.180"

module.exports = { SECRET_KEY, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_USER, FRONTEND_IP }
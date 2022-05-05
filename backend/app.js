const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
require('dotenv').config()
var cors = require('cors')
const { FRONTEND_IP } = require('./config/hot-config')


const corsOptions = {
  origin: 'http://' + FRONTEND_IP + ':8080',
  credentials: true,
};
// console.log(FRONTEND_IP)
app.options('http://' + FRONTEND_IP + ':8080', cors())

const router = require("./controllers/controller")

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(router)




// console.log(process.env.DB_HOST)

app.listen(port, () => {
  console.log("Server has started!")
})

module.exports = app
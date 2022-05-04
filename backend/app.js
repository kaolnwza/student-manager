
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
var cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.options('http://localhost:8080', cors())

const router = require("./controllers/controller")

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(router)


require('dotenv').config()

console.log(process.env.DB_HOST)

app.listen(port, () => {
  console.log("Server has started!")
})

module.exports = app
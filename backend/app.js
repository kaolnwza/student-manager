
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
var cors = require('cors')

app.options('*', cors())

const router = require("./controllers/controller")
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(router)


app.listen(port, () => {
  console.log("Server has started!")
})

module.exports = app
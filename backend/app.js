
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')

app.options('*', cors())

const router = require("./controllers/controller")

app.use(express.json())
app.use(router)



app.listen(port, () => {
  console.log("Server has started!")
})

module.exports = app
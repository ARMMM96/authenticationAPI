const express = require("express")
const path = require("path")
const cors = require("cors")
const app = express()
const connectDB = require("../database/connection.js")

app.use(cors())
connectDB();
app.use(express.json())
app.use(express.static(path.join(__dirname, "../uploads")))




app.all("*", (req, res) => {
    res.status(404).send({
        apisStatus: false,
        message: "Invalid URL",
        data: {}
    })
})

module.exports = app
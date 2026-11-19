
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = require("./app")
const PORT = process.env.PORT

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Mongoose Connected Successfully")
}).catch((err) => {
    console.log("Mongoose Connected failed");
})

app.listen(PORT, () => console.log("Server start " + PORT));
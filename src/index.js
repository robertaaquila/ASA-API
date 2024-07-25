require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
var isConn = false

// Credentials
const DB_CONN = process.env.DB_CONN

app.use(express.json())

// Routes
const pacienteRoutes = require("./routes/paciente.route.js")
const consultaRoutes = require("./routes/consulta.route.js")
const medicoRoutes = require("./routes/medico.route.js")

app.use("/paciente", pacienteRoutes)
app.use("/consulta", consultaRoutes)
app.use("/medico", medicoRoutes)

app.get("/", (req, res) => {
    res.status(200).send({
        API: "ASA API",
        status: isConn ? "Health" : "Unhealth"
    })
})

// Start API
app.listen(3000, (res) => {
    mongoose.connect(DB_CONN)
    .then((res) => {
      isConn = true
      console.log("Connect in database and running...")
    })
    .catch((err) => {
        isConn = false
        console.log(err)
    })
})
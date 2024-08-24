const express = require("express")
const app = express()

app.use(express.json())


const pacienteRoutes = require("./routes/paciente")
const medicoRoutes = require("./routes/medico")
const consultaRoutes = require("./routes/consulta")
// Routes
app.use("/paciente", pacienteRoutes)
app.use("/medico", medicoRoutes)
app.use("/consulta", consultaRoutes)


app.get("/", (_, res) => {
    return res.status(200).send({Status: "Health"})
})

app.listen(3000, () => {
    console.log("Running...")
})
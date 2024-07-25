const mongoose = require("mongoose")

const horario = mongoose.model("horario",{
    medico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "medico"
    },
    horario: Date,
    disponivel: String
})


module.exports = horario
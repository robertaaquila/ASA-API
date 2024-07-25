const mongoose = require("mongoose")

const consulta = mongoose.model("consulta", {
    data_consulta: Date,
    checkin: String,
    tipo_consulta: String,
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "paciente",
        required: true
    },
    medico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "medico",
        required: true
    },
    status: String
})

module.exports = consulta
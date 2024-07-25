const mongoose = require("mongoose")

const paciente = mongoose.model("paciente", {
    nome: String,
    email: String,
    cpf: {
        type: String,
        unique: true
    },
    telefone: String,
    genero: String,
    data_nascimento: Date,
    senha: String
})

module.exports = paciente
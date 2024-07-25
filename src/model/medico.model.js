const mongoose = require("mongoose")

const medico = mongoose.model("medico", {
    nome: String,
    cpf: String,
    email: {
        type: String, 
        match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um e-mail válido.']
    },
    senha: String,
    criadoEm: {
        type: Date,
        default: Date.now
    }
})

module.exports = medico
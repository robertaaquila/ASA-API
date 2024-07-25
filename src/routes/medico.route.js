const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

// Model
const medico_model = require("../model/medico.model.js")

// Cadastrar novo médico

router.post("/", async (req, res) => {
    const {nome, cpf, email, telefone, senha, confirmar_senha} = req.body

    // Validação
    if(!nome){
        return res.status(422).send({message: "Nome é obrigatório"})
    }
    if(!cpf){
        return res.status(422).send({message: "CPF é obrigatório"})
    }
    if(!email){
        return res.status(422).send({message: "E-mail é obrigatório"})
    }
    if(!telefone){
        return res.status(422).send({message: "Telefone é obrigatório"})
    }
    if(!senha){
        return res.status(422).send({message: "Senha é obrigatória"})
    }

    // Comparação de senhas
    if(confirmar_senha !== senha){
        return res.status(422).send({message: "As senhas precisam ser iguais"})
    }

    // Validar se o médico ja existe
    const medico_existe = await medico_model.findOne({cpf: cpf})

    if(medico_existe){
        return res.status(422).send({message: "O médico ja está cadastrado"})
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(12)
    const senha_hash = await bcrypt.hash(senha, salt)

    // Criar médico
    const medico = new medico_model({
        nome,
        cpf,
        email,
        telefone,
        senha: senha_hash
    })

    try {
        await medico.save()

        res.status(201).send({message: "Médico criado com sucesso"})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar o usuário, tente novamente mais tarde"
        })

        console.log(error)
    }
})

module.exports = router
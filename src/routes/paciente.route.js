const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

// Model
const paciente_model = require("../model/paciente.model.js")

// Buscar paciente pelo ID
router.get("/:id", async (req, res) => {
    const id = req.params.id

    try {
        const paciente = await paciente_model.findById({_id: id})

        res.status(200).send({paciente})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar o usuário, tente novamente mais tarde"
        })

        console.log(error)
    }

})

// Cadastrar novo usuário
router.post("/", async (req, res) => {
    const {nome, email, cpf, telefone, genero, data_nascimento, senha, confirmar_senha} = req.body

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
    if(!data_nascimento){
        return res.status(422).send({message: "Data de nascimento é obrigatório"})
    }
    if(!telefone){
        return res.status(422).send({message: "Telefone é obrigatório"})
    }
    if(!genero){
        return res.status(422).send({message: "Gênero é obrigatório"})
    }
    if(!senha){
        return res.status(422).send({message: "Senha é obrigatória"})
    }

    // Comparação de senhas
    if(confirmar_senha !== senha){
        return res.status(422).send({message: "As senhas precisam ser iguais"})
    }

    // Validar se o usuário existe
    const paciente_existe = await paciente_model.findOne({cpf: cpf})

    if(paciente_existe){
        return res.status(422).send({message: "Você já possuí cadastro"})
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(12)
    const senha_hash = await bcrypt.hash(senha, salt)

    // Criar usuário
    const paciente = new paciente_model({
        nome,
        cpf,
        email,
        telefone,
        genero,
        data_nascimento,
        senha: senha_hash
    })

    try {
        await paciente.save()

        res.status(201).send({message: "Usuário criado com sucesso"})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar o usuário, tente novamente mais tarde"
        })

        console.log(error)
    }
    
})

// Logar paciente
router.post("/login", async (req, res)=> {
    const {cpf, senha} = req.body

    // Validação
    if(!cpf){
        return res.status(422).send({message: "CPF é obrigatório"})
    }
    if(!senha){
        return res.status(422).send({message: "Senha é obrigatória"})
    }

    // Validar se existe usuário
    const paciente_existe = await paciente_model.findOne({cpf: cpf})

    if(!paciente_existe){
        return res.status(404).send({message: "Usuário não encontrado"})
    }

    // Validar se a senha é igual a cadastrada
    const validar_senha = await bcrypt.compare(senha, paciente_existe.senha)

    if(!validar_senha){
        return res.status(422).send({message: "Usuário ou senha incorreta"})
    }

    try {
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({
            id: paciente_existe._id,
        }, secret, {expiresIn: "8h"})

        res.status(200).send({message: "Autenticado com sucesso", token})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar o usuário, tente novamente mais tarde"
        })

        console.log(error)
    }
})



module.exports = router
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

// Model
const db = require("../database/index.js");

// Cadastrar novo médico

router.post("/", async (req, res) => {
    const {nome, matricula, senha, confirmar_senha} = req.body

    // Validação
    if(!nome){
        return res.status(422).send({message: "Nome é obrigatório"})
    }
    if(!matricula){
        return res.status(422).send({message: "Matricula é obrigatória"})
    }
    if(!senha){
        return res.status(422).send({message: "Senha é obrigatória"})
    }

    // Comparação de senhas
    if(confirmar_senha !== senha){
        return res.status(422).send({message: "As senhas precisam ser iguais"})
    }

    // Validar se o médico ja existe
    const medico_existe = await db.medico.findUnique({where:{matricula: matricula}})

    if(medico_existe){
        return res.status(422).send({message: "O médico ja está cadastrado"})
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(12)
    const senha_hash = await bcrypt.hash(senha, salt)

    

    try {

        // Criar médico
    const medico = await db.medico.create({data:{
        nome_medico: nome,
        matricula: matricula,
        senha: senha_hash
    }})
        

        res.status(201).send({message: "Médico criado com sucesso"})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar o usuário, tente novamente mais tarde"
        })

        console.log(error)
    }
})


// Logar medico
router.post("/login", async (req, res) => {
    const { matricula, senha } = req.body;
  
    // Validação
    if (!matricula) {
      return res.status(422).send({ message: "Matricula é obrigatória" });
    }
    if (!senha) {
      return res.status(422).send({ message: "Senha é obrigatória" });
    }
  
    // Validar se existe usuário
    const medico_existe = await db.medico.findUnique({where: {matricula: matricula}});
  
    if (!medico_existe) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
  
    // Validar se a senha é igual a cadastrada
    const validar_senha = await bcrypt.compare(senha, medico_existe.senha);
  
    if (!validar_senha) {
      return res.status(422).send({ message: "Usuário ou senha incorreta" });
    }
  
    try {
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          id: medico_existe._id,
        },
        secret,
        { expiresIn: "8h" }
      );
  
      res.status(200).send({ message: "Autenticado com sucesso", token });
    } catch (error) {
      res.status(500).send({
        message: "Erro ao criar o usuário, tente novamente mais tarde",
      });
  
      console.log(error);
    }
  });
module.exports = router
const express = require("express")
const router = express.Router()

const jwt_verificar = require("../middleware/jwt.js")

// Model
const db = require("../database/index.js");

// Buscar consulta por ID
router.get("/:id", jwt_verificar, async (req, res) => {
    const id = req.params.id


    try {
        const consulta = await db.consulta.findUnique({
            where:{
                id_consulta: parseInt(id)
            },
            include: {
              id_paciente: true, // Inclui detalhes do paciente relacionado
              id_medico: true,   // Inclui detalhes do médico relacionado
            },
          });

        res.status(200).send({consulta})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar a consulta, tente novamente mais tarde"
        })

        console.log(error)
    }
})

// Buscar consulta por paciente
router.get("/paciente/:id",jwt_verificar, async (req, res) => {
    const id = req.params.id 

    try {
        const consulta = await db.consulta.findMany({
            where:{
                paciente_id: parseInt(id)
            },
            include: {
              id_paciente: true, // Inclui detalhes do paciente relacionado
              id_medico: true,   // Inclui detalhes do médico relacionado
            },
          });

        res.status(200).send({consulta})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar a consulta, tente novamente mais tarde"
        })

        console.log(error)
    }
})

// Buscar consulta por medico
router.get("/medico/:id", jwt_verificar, async (req, res) => {
    const id = req.params.id 

    try {
        const consulta = await db.consulta.findMany({
            where:{
                medico_id: parseInt(id)
            },
            include: {
              id_paciente: true, // Inclui detalhes do paciente relacionado
              id_medico: true,   // Inclui detalhes do médico relacionado
            },
          });

        res.status(200).send({consulta})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao buscar a consulta, tente novamente mais tarde"
        })

        console.log(error)
    }
})

// Criar consulta
router.post("/",jwt_verificar, async (req, res) => {
    const {data_consulta, tipo_consulta, checkin, paciente_id, medico_id, status } = req.body

    // Validação
    if(!data_consulta){
        return res.status(422).send({message: "Data da consulta é obrigatória"})
    }
    if(!tipo_consulta){
        return res.status(422).send({message: "Tipo da consulta é obrigatório"})
    }
    if(!checkin){
        return res.status(422).send({message: "Checkin é obrigatório"})
    }
    if(!paciente_id){
        return res.status(422).send({message: "ID do paciente é obrigatório"})
    }
    if(!medico_id){
        return res.status(422).send({message: "ID do médico é obrigatório"})
    }
    if(!status){
        return res.status(422).send({message: "Status da consulta é obrigatório"})
    }


    try {
        // Verificar se já existe uma consulta nessa data
    const consulta_existe = await db.consulta.findMany({
        where:{
            data_consulta: data_consulta
        }
    })

    if(consulta_existe.length > 0){
        return res.status(422).send({message: "Já possui horário marcado, agende outro horário"})
    }
    } catch (error) {
        console.log(error)
        return
    }
    

    

    
    try {
        // Criar consulta
        const consulta = await db.consulta.create({data:{
            data_consulta,
            tipo_consulta,
            checkin,
            paciente_id: parseInt(paciente_id) ,
            medico_id: parseInt(medico_id),
            status
        }
        })

        res.status(201).send({message: "Consulta criada com sucesso"})
        
    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar a consulta, tente novamente mais tarde"
        })

        console.log(error)
    }
})

// Alterar o status da consulta
router.put("/:id", jwt_verificar, async (req, res) => {
    const { status } = req.body
    const id = req.params.id

    // Validação
    if(!id){
        return res.status(422).send({message: "ID da consulta é obrigatório"})
    }
    if(!status){
        return res.status(422).send({message: "Status da consulta é obrigatório"})
    }
    

    // Verificar se existe consulta
    const consulta_existe = await db.consulta.findUnique({
        where:{
            id_consulta: parseInt(id)
        }
    })

    if(!consulta_existe){
        return res.status(422).send({message: "Não possui consulta com esse ID"})
    }

    // Atualizar o status
    try {
        const consulta_existe = await db.consulta.update({
            where:{
                id_consulta: parseInt(id)
            },
            data:{
                status:status
            }
        })
        res.status(201).send({message: "Status da consulta atualizado com sucesso"})

    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar a consulta, tente novamente mais tarde"
        })

        console.log(error)
    }
    
})

// Fazer checkin
router.put("/checkin/:id", jwt_verificar, async (req, res) => {
    const id = req.params.id

    // Validação
    if(!id){
        return res.status(422).send({message: "ID da consulta é obrigatório"})
    }
    

    // Verificar se existe consulta
    const consulta_existe = await db.consulta.findUnique({
        where:{
            id_consulta: parseInt(id)
        }
    })

    if(!consulta_existe){
        return res.status(422).send({message: "Não possui consulta com esse ID"})
    }

    // Atualizar o status
    try {
        const consulta_existe = await db.consulta.update({
            where:{
                id_consulta: parseInt(id)
            },
            data:{
                checkin: "Realizado"
            }
        })
        res.status(201).send({message: "Checkin realizado com sucesso"})

    } catch (error) {
        res.status(500).send({
            message: "Erro ao criar a consulta, tente novamente mais tarde"
        })

        console.log(error)
    }
    
})


module.exports = router
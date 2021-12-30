const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {

        try {
            const todasAsPessoas = await database.Pessoas.findAll()

            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error.message)
        }

    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params

        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body

        try {
            const novaPessoacriada = await database.Pessoas.create(novaPessoa)
            res.status(201).json(novaPessoacriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const novasInfos = req.body
        const { id } = req.params
        try {
            await database.Pessoas.update(
                novasInfos,
                {
                    where: {
                        id: id
                    }
                }
            )
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req,res){
        const {id} = req.params

        try{
            await database.Pessoas.destroy({
                where:{
                    id: Number(id)
                }
            })

            return res.status(200).json({mensagem: `id ${id} deletado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const {estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}

        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            res.status(201).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const novasInfos = req.body
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.update(
                novasInfos,
                {
                    where: {
                        id: matriculaId,
                        estudante_id: estudanteId
                    }
                }
            )
            const pessoaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            })
            res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req,res){
        const { estudanteId, matriculaId } = req.params

        try{
            await database.Matriculas.destroy({
                where:{
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            return res.status(200).json({mensagem: `id ${matriculaId} deletado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController
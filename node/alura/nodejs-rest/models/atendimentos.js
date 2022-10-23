const res = require('express/lib/response')
const moment = require('moment')
const axios = require("axios")
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimento')


class Atendimento {
    constructor(){
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (tamanho) => tamanho >= 5

        this.valida = (parametros) =>{
            this.validacoes.filter(campo =>{
                const {nome} = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })
        }

        this.validacoes = [
            {
                nome: 'data',
                mensagem: 'Data deve ser maior ou igual a data atual',
                valido: this.dataEhValida
            },
            {
                nome: 'cliente',
                mensagem: 'Cliente deve ter pelo menos cinco caracteres',
                valido: this.clienteEhValido
            },
        ]
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve, reject)=>{
                reject(erros)
            })
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repositorio.adiciona(atendimentoDatado)
                .then((resultados)=>{
                    const id = resultados.insertId
                    return {...atendimento,id}
                })
        }

    }

    lista(){
        
        return repositorio.lista()
    }

    buscarId(id){

        return repositorio.buscarId(id)
            .then(async (resultados) =>{
                const atendimento = resultados[0]
                const cpf = atendimento.cliente
                const {data} =  await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data

                return atendimento
            })
    }

    altera(id,valores){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        return repositorio.altera(id,valores)
            .then(async (resultados) =>{
                return {...valores,id}
            })
    }

    deleta(id){
        
        return repositorio.deleta(id)
            .then((resultados) =>{
                return {id}
            })

    }
}

module.exports = new Atendimento
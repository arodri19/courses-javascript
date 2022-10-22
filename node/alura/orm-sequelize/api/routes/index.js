const bodyParser = require('body-parser')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')
const pessoas = require('./pessoasRoute')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(pessoas)
    app.use(niveis)
    app.use(turmas)
}
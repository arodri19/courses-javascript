const mongoose = require('mongoose')
module.exports = mongoose.connect('mongodb://localhost/dbfinance')

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite maxímo de '{MIN}'."
mongoose.Error.messages.Number.enum = "'{VALUE}' não é valido para o atributo '{PATH}'."

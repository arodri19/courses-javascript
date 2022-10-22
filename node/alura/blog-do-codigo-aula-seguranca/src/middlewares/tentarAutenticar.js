const {middlewaresAutenticacao} = require('../usuarios')
module.exports = (req, res, proximo) =>{
    if(req.get('Authorization')){
        req.estaAutenticado = false
        return middlewaresAutenticacao.bearer(req, res, proximo)
    }

    proximo()
}
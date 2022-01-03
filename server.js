require('dotenv').config()

const app = require('./app');
const port = 3000;
const db = require('./database');
require('./redis/blocklist-access-token')
require('./redis/allowlist-refresh-token')
const { InvalidArgumentError,NaoEncontrado, NaoAutorizado } = require('./src/erros');
const jwt = require("jsonwebtoken")

app.use((req,res,proximo)=>{
    res.set({
        'Content-Type': 'application/json'
    })
    proximo()
})

const routes = require('./rotas');
routes(app);

app.use((error, req, res, proximo) => {
    let status = 500
    const corpo = {
        mensagem: error.message
    }

    if(error instanceof NaoAutorizado){
        status = 401
    }

    if(error instanceof NaoEncontrado){
        status = 404
    }
    
    if(error instanceof InvalidArgumentError){
        status = 400
    }

    if(error instanceof jwt.JsonWebTokenError){
        status = 401
    }
    if(error instanceof jwt.TokenExpiredError){
        status = 401
        corpo.expiradoEM = error.expiredAt
    }

    res.status(status).json(corpo)
})

app.listen(port, () => console.log(`App listening on port ${port}`));

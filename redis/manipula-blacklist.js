const blacklist = require('./blacklist');

const {promisify} = require('util')
const existsAsync = promisify(blacklist.exists).bind(blacklist)
const setAsync = promisify(blacklist.set).bind(blacklist)

const jwt = require('jsonwebtoken')

const {createHash} = require('crypto')

function geraTokenhash(token){
    return createHash('sha256').update(token).digest('hex');
}

module.exports = {
    adiciona: async token => {
        const dataExpiracao = jwt.decode(token).exp
        const tokenHash = geraTokenhash(token)
        await blacklist.set(tokenHash,'')
        //await setAsync(tokenHash, '');
        blacklist.expireAt(tokenHash, dataExpiracao)
    },
    contemToken: async token => {
        const tokenHash = geraTokenhash(token);
        //await blacklist.connect()
        const resultado = await blacklist.exists(tokenHash);
        //const resultado = await existsAsync(tokenHash);
        return resultado;
    }
}
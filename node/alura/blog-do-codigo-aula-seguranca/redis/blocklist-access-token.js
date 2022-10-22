const redis = require('redis');

const client = redis.createClient(
    {
        host: 'redis',
        port: 6379,
        password: 'teste',
    }
)

async function conectar(client){
    await client.connect()
}

conectar(client)

client.on('connect', function () {
    console.log('Conectado!');
});

client.on('ready', function () {
    console.log('Pronto!');
});

client.on('error', (err) => {
    console.log('Redis Client Error', err)
});


const manipulaLista = require('./manipula-lista')
const manipulaBlocklist = manipulaLista(client)

const prefix = 'blocklist:'

const jwt = require('jsonwebtoken')

const {createHash} = require('crypto')

function geraTokenhash(token){
    return createHash('sha256').update(token).digest('hex');
}

module.exports = {
    async adiciona(token) {
        const dataExpiracao = jwt.decode(token).exp
        const tokenHash = geraTokenhash(token)
        await manipulaBlocklist.adiciona(tokenHash,'', dataExpiracao, prefix)
    },
    async contemToken(token) {
        const tokenHash = geraTokenhash(token);
        return manipulaBlocklist.contemChave(tokenHash, prefix);
    }
}
const redis = require('redis');
const manipulaLista = require('./manipula-lista')
const allowlist = redis.createClient(
    {
        host: 'redis',
        port: 6379,
        password: 'teste'
    }
)

async function conectar(allowlist){
    await allowlist.connect()
}

conectar(allowlist)

allowlist.on('connect', function () {
    console.log('Conectado!');
});

allowlist.on('ready', function () {
    console.log('Pronto!');
});

allowlist.on('error', (err) => {
    console.log('Redis Client Error', err)
});

module.exports = manipulaLista(allowlist)
const redis = require('redis')
const conexao = redis.createClient({

    host: 'redis',
    port: 6379,
    password: 'teste',

})

async function conectar(conexao){
    await conexao.connect()
}

conectar(conexao)

conexao.on('connect', function () {
    console.log('Conectado!');
});

conexao.on('ready', function () {
    console.log('Pronto!');
});

conexao.on('error', (err) => {
    console.log('Redis Client Error', err)
});
const manipulaLista = require('./manipula-lista')
module.exports = manipulaLista(conexao)
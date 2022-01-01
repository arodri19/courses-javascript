const redis = require('redis');

const client = redis.createClient(
    {
        host: 'redis',
        port: 6379,
        password: 'teste'
    }, {
    prefix: 'blacklist:'
})

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

module.exports = client

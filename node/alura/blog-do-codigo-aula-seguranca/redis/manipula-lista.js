module.exports = lista => {

    return {
        async adiciona(chave, valor, dataExpiracao, prefix = 'allowlist-refresh-token:') {
            await lista.set(prefix + chave, valor)
            lista.expireAt(prefix + chave, dataExpiracao)
        },
        async buscaValor(chave, prefix = 'allowlist-refresh-token:') {
            return await lista.get(prefix + chave)
        },
        async contemChave(chave, prefix) {
            const resultado = await lista.exists(prefix + chave)
            return resultado
        },
        async deleta(chave, prefix = 'allowlist-refresh-token:') {
            await lista.del(prefix + chave)
        }
    }
}
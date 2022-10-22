const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto'),
]

async function criarTabelas(){
    for (const item of modelos) {
        await item
            .sync()
            .then(()=> console.log('Tabela criada com sucesso'))
            .catch(console.log)
    }
}

criarTabelas()
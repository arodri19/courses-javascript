import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';
import { UsuarioRepository } from 'src/usuario/usuario.repository';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  constructor(
    private readonly usuarioRepository: UsuarioRepository
  ) { }

  salva(dadosProduto: ProdutoEntity) {
    // if(this.usuarioRepository.existeComId(dadosProduto.id)){
    //   throw new Error('Usuário não existe');
    // }
    this.produtos.push(dadosProduto);
    return dadosProduto;
  }

  listaTodos() {
    return this.produtos;
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new Error('Produto não existe');
    }

    return possivelProduto;
  }

  async atualiza(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const produto = this.buscaPorId(id);
    Object.entries(dadosProduto).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      produto[chave] = valor;
    });

    return produto;
  }

  async remove(id: string) {
    const produtoRemovido = this.buscaPorId(id);
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    return produtoRemovido;
  }
}


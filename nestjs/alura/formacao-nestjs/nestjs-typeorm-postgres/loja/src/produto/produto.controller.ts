import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoRepository } from './produto.repository';
import { UsuarioRepository } from 'src/usuario/usuario.repository';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly usuarioRepository: UsuarioRepository
  ) { }

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = uuid();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    // produto.caracteristicas = dadosProduto.caracteristicas;
    // produto.imagens = dadosProduto.imagens;


    // if(!this.usuarioRepository.existeComId(produto.usuarioId)){
    //   throw new Error('Usuário não existe');
    // }
    const produtoCadastrado = this.produtoRepository.salva(produto);
    return produtoCadastrado;
  }

  @Get()
  async listaTodos() {
    return this.produtoRepository.listaTodos();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoRepository.atualiza(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { BuscaUsuarioId } from 'src/usuario/validacao/busca-usuairo-id.validator';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepository, UsuarioRepository, BuscaUsuarioId],
})
export class ProdutoModule {}

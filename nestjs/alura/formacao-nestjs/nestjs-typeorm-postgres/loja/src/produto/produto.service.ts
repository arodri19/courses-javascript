import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) {}

    async criaProduto(produtoEntity: ProdutoEntity) {
        await this.produtoRepository.save(produtoEntity)
    }

    async listaProdutos() {
        const produtosSalvos = await this.produtoRepository.find();
        const produtosLista = produtosSalvos.map(
            (produto) => new ListaProdutoDTO(produto.id, produto.nome)
        );
        return produtosLista;
    }

    async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
        const entityName = await this.produtoRepository.findOneBy({ id });
        Object.assign(entityName, novosDados);
        await this.produtoRepository.save(entityName);
        return;
    }

    async deletaProduto(id: string) {
        await this.produtoRepository.delete(id);
        return;
    }
}
export class ProdutoEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidade: number;
    descricao: string;
    caracteristicas: CaracteristicaProdutoDTO[];
    imagens: ImagemProdutoDTO[];
    categoria: string;
}

export class CaracteristicaProdutoDTO {
    nome: string;
    descricao: string;
}

export class ImagemProdutoDTO {
    url: string;
    descricao: string;
}
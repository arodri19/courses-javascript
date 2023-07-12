import { ProdutoCaracteristicaEntity } from '../produto/produto-caracteristica.entity';
import { ProdutoImagemEntity } from '../produto/produto-imagem.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { PedidoEntity } from '../pedido/pedido.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { CriaTabelas1688401665650 } from './migrations/1688401665650-cria-tabelas';
import { AlteracaoTabelaProdutoUsuarioId1688402337691 } from './migrations/1688402337691-alteracao-tabela-produto-usuario-id';
import { MapeandoUsuarioPedido1688516692709 } from './migrations/1688516692709-mapeando-usuario-pedido';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    UsuarioEntity,
    ProdutoEntity,
    ProdutoImagemEntity,
    ProdutoCaracteristicaEntity,
    PedidoEntity,
  ],
  migrations: [
    CriaTabelas1688401665650,
    AlteracaoTabelaProdutoUsuarioId1688402337691,
    MapeandoUsuarioPedido1688516692709,
  ],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

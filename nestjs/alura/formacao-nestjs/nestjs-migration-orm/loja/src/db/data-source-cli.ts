import { ProdutoCaracteristicaEntity } from '../../src/produto/produto-caracteristica.entity';
import { ProdutoImagemEntity } from '../../src/produto/produto-imagem.entity';
import { ProdutoEntity } from '../../src/produto/produto.entity';
import { UsuarioEntity } from '../../src/usuario/usuario.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { CriaTabelas1688401665650 } from '../../src/migrations/1688401665650-cria-tabelas';
import { AlteracaoTabelaProdutoUsuarioId1688402337691 } from '../../src/migrations/1688402337691-alteracao-tabela-produto-usuario-id';

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
  ],
  migrations: [
    CriaTabelas1688401665650,
    AlteracaoTabelaProdutoUsuarioId1688402337691,
  ],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

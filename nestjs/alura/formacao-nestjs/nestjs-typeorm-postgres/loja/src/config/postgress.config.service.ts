import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ProdutoCaracteristicaEntity } from "src/produto/produto-caracteristica.entity";
import { ProdutoImagemEntity } from "src/produto/produto-imagem.entity";
import { ProdutoEntity } from "src/produto/produto.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: "postgres",
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [UsuarioEntity, ProdutoEntity, ProdutoImagemEntity, ProdutoCaracteristicaEntity],
            synchronize: true
        }
    }

}
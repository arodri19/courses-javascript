import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlteracaoTabelaProdutoUsuarioId1688402337691
  implements MigrationInterface
{
  name = 'AlteracaoTabelaProdutoUsuarioId1688402337691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "usuario_id" character varying(100)`,
    );
  }
}

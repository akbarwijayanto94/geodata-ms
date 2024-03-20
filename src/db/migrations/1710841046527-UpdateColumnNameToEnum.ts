import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateColumnNameToEnum1710841046527 implements MigrationInterface {
  name = 'UpdateColumnNameToEnum1710841046527'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`)
    await queryRunner.query(
      `CREATE TYPE "public"."roles_name_enum" AS ENUM('ADMIN', 'OPERATION', 'CUSTOMER')`
    )
    await queryRunner.query(`ALTER TABLE "roles" ADD "name" "public"."roles_name_enum"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`)
    await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`)
    await queryRunner.query(`ALTER TABLE "roles" ADD "name" character varying NOT NULL`)
  }
}

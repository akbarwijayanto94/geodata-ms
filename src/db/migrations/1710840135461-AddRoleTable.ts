import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRoleTable1710840135461 implements MigrationInterface {
  name = 'AddRoleTable1710840135461'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "deleted_by" character varying, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`ALTER TABLE "users" ADD "role_id" integer`)
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`)
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`)
    await queryRunner.query(`DROP TABLE "roles"`)
  }
}

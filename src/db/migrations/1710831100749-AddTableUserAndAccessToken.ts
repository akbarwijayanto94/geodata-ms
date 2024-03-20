import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTableUserAndAccessToken1710831100749 implements MigrationInterface {
  name = 'AddTableUserAndAccessToken1710831100749'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "deleted_by" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "address" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "users_access_token" ("created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "deleted_by" character varying, "id" SERIAL NOT NULL, "token" character varying NOT NULL, "expired" integer NOT NULL, "is_expired" boolean NOT NULL, "user_id" uuid, CONSTRAINT "PK_0204ead4c6b096e02abc47c88cd" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "users_access_token" ADD CONSTRAINT "FK_f57b8d30028d935045e34eebd47" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_access_token" DROP CONSTRAINT "FK_f57b8d30028d935045e34eebd47"`
    )
    await queryRunner.query(`DROP TABLE "users_access_token"`)
    await queryRunner.query(`DROP TABLE "users"`)
  }
}

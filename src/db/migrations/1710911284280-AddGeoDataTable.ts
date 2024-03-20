import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddGeoDataTable1710911284280 implements MigrationInterface {
  name = 'AddGeoDataTable1710911284280'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."geodata_type_enum" AS ENUM('Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection', 'Feature', 'FeatureCollection')`
    )
    await queryRunner.query(
      `CREATE TABLE "geodata" ("created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying, "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "deleted_by" character varying, "id" SERIAL NOT NULL, "type" "public"."geodata_type_enum" NOT NULL, "data" jsonb NOT NULL, "user_id" uuid, CONSTRAINT "PK_f8fc701dba03ef8516b7c6af84f" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "geodata" ADD CONSTRAINT "FK_2e6da422f13a4969a11f9d9933c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "geodata" DROP CONSTRAINT "FK_2e6da422f13a4969a11f9d9933c"`
    )
    await queryRunner.query(`DROP TABLE "geodata"`)
    await queryRunner.query(`DROP TYPE "public"."geodata_type_enum"`)
  }
}

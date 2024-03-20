import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnInGeoDataTable1710918528799 implements MigrationInterface {
    name = 'AddColumnInGeoDataTable1710918528799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "geodata" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "geodata" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "geodata" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "geodata" DROP COLUMN "title"`);
    }

}

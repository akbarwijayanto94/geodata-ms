import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertInitialRoleData1710859232894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles (created_at, created_by, updated_at, updated_by, id, "name") VALUES(now(), '', now(), '', 1, 'ADMIN')`
    )
    await queryRunner.query(
      `INSERT INTO roles (created_at, created_by, updated_at, updated_by, id, "name") VALUES(now(), '', now(), '', 2, 'OPERATION')`
    )
    await queryRunner.query(
      `INSERT INTO roles (created_at, created_by, updated_at, updated_by, id, "name") VALUES(now(), '', now(), '', 3, 'CUSTOMER')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles WHERE id=1`)
    await queryRunner.query(`DELETE FROM roles WHERE id=2`)
    await queryRunner.query(`DELETE FROM roles WHERE id=3`)
  }
}

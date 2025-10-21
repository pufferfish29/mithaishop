import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductTable1761062644653 implements MigrationInterface {
    name = 'AddProductTable1761062644653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(64) NOT NULL, "unit_price" double precision NOT NULL, "price_per_kg" double precision NOT NULL, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}

import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddSalesTable1762187540426 implements MigrationInterface {
  name = "AddSalesTable1762187540426";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sale" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "total_amount" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer NOT NULL, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b"`,
    );
    await queryRunner.query(`DROP TABLE "sale"`);
  }
}

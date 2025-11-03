import type { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUserAddColumnUserRoleDefaultUser1761905339871
  implements MigrationInterface
{
  name = "AlterTableUserAddColumnUserRoleDefaultUser1761905339871";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user', 'guest')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}

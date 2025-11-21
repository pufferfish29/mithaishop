import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export const datasource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  ssl: true,
  entities: [process.cwd() + "/dist/**/*.entity.js"],
  migrations: [
    process.cwd() + "/dist/migrations/*.js",
    process.cwd() + "/src/migrations/*.ts",
  ],
});

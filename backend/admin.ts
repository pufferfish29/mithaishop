import { DataSource } from "typeorm";
import { hashSync, genSaltSync } from "bcryptjs";
import { config } from "dotenv";

config();

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: +5433,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

async function createAdmin() {
  await dataSource.initialize();

  const username = "admin";
  const email = "admin@example.com";
  const password = "securepassword";
  const hashedPassword = hashSync(password, genSaltSync());

  const existing = (await dataSource.query(
    `SELECT * FROM "user" WHERE email = $1`,
    [email],
  )) as unknown as { length: number };

  if (existing.length > 0) {
    console.log("Admin already exists!");
    await dataSource.destroy();
    return;
  }

  await dataSource.query(
    `INSERT INTO "user" (username, email, password, role) 
     VALUES ($1, $2, $3, $4)`,
    [username, email, hashedPassword, "admin"],
  );

  console.log("Admin user created!");
  await dataSource.destroy();
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});

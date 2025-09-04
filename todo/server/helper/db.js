import pkg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const environment = process.env.NODE_ENV || "development";

const { Pool } = pkg;

//const port = process.env.port;

const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database:
      environment === "development"
        ? process.env.DB_NAME
        : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  return pool;
};
const pool = openDb();
export { pool };

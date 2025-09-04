import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";
import { pool } from "./db.js";

// Tehtävänannon mukaisesti käytetään import.meta.dirname
const __dirname = import.meta.dirname;

/**
 * Ajaa server/todo.sql sisään: pudottaa ja luo taulut ja siementää datan.
 * Idempotentti, koska todo.sql aloittaa DROP TABLE IF EXISTS -lauseilla.
 */
const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, "../todo.sql"), "utf8");
  pool.query(sql, (err) => {
    if (err) {
      console.error("Error initializing test database:", err);
    } else {
      console.log("Test database initialized successfully");
    }
  });
};

/**
 * Lisää testikäyttäjän tietokantaan.
 * Hyväksyy joko:
 *  - (email, password) tai
 *  - ({email, password})
 */
const insertTestUser = (emailOrObj, maybePassword) => {
  const email = typeof emailOrObj === "object" ? emailOrObj.email : emailOrObj;
  const password =
    typeof emailOrObj === "object" ? emailOrObj.password : maybePassword;

  if (!email || !password) {
    console.error("insertTestUser requires email and password");
    return;
  }

  hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return;
    }
    pool.query(
      "INSERT INTO account (email, password) VALUES ($1, $2)",
      [email, hashedPassword],
      (err) => {
        if (err) {
          console.error("Error inserting test user:", err);
        } else {
          console.log("Test user inserted successfully");
        }
      }
    );
  });
};

/**
 * Luo JWT-tokenin.
 * Hyväksyy joko:
 *  - email (string) tai
 *  - { email } (object)
 * Palauttaa pelkän token-merkkijonon, jonka voi laittaa Authorization-headeriin.
 */
const getToken = (emailOrObj) => {
  const email = typeof emailOrObj === "object" ? emailOrObj.email : emailOrObj;
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY);
};

export { initializeTestDb, insertTestUser, getToken };

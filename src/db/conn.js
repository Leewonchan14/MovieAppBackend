import mysql from "mysql2/promise";
import tables from "./tables.js";

const { DB_URL, DB_USER, DB_PASSWORD } = process.env;

export class DB {
  static pool = null;

  static getPool() {
    return DB.pool;
  }

  static createPool({ DB_URL, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE }) {
    let pool = mysql.createPool({
      host: DB_URL ?? "localhost",
      port: DB_PORT ?? 3301,
      user: DB_USER ?? "root",
      password: DB_PASSWORD ?? "1234",
      database: DB_DATABASE ?? "express1",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      maxIdle: 10,
    });
    this.pool = pool;
    return pool;
  }
}

export default {
  async execute(queryString = "", params = []) {
    const [rows, fields] = await DB.getPool().execute(queryString, params);
    console.log(queryString);
    return rows;
  },

  async initTables() {
    try {
      for (let [table, schema] of Object.entries(tables)) {
        await DB.getPool().execute(schema);
        console.log(`${table} table is created if not exist`);
      }
    } catch (error) {
      console.log("Error creating tables!");
      console.error(error);
    }
  },
};

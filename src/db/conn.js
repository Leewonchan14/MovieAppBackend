import mysql from "mysql2/promise";
import tables from "./tables.js";


class DB {
  static pool = null;

  static getPool() {
    if (!DB.pool) {
      DB.pool = this.#getPool();
    }
    return DB.pool;
  }

  static #getPool = () => {
    return mysql.createPool({
      host: "localhost",
      port: 3301,
      user: "root",
      password: "1234",
      database: "express1",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      maxIdle: 10,
    })
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
        console.log(`${table} table is created is not exist`);
      }
    } catch (error) {
      console.log("Error creating tables!")
      console.error(error);
    }
  }
}
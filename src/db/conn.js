import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3301,
  user: "root",
  password: "1234",
  database: "express1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  maxIdle: 10,
});

export default {
  async execute(queryString, params) {
    const [rows, fields] = await pool.execute(queryString, params);
    return rows;
  },
}
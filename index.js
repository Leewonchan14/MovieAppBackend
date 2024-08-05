import express from "express";
import logger from "morgan";
import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

const app = express();
app.use(logger("dev"));

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

let [rows, fields] = await pool.execute("SELECT * FROM user");

console.log(rows, fields);


app.get("/", (req, res) => {
  res.send("Express Server Update");
});

app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
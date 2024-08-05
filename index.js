import express from "express";
import logger from "morgan";
import conn from "./src/db/conn.js";

const app = express();
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Express Server Update");
});

app.listen(4000,  async () => {
  await conn.initTables();
  console.log(`Server is running at http://localhost:4000`);
});
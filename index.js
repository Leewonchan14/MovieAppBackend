// src/index.js
import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

const app = express();
// const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Express Server Update");
});

app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
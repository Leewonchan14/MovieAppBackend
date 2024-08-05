import express from "express";
import logger from "morgan";
// import dotenv from "dotenv";

// dotenv.config();

const app = express();
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Express Server Update");
});

app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
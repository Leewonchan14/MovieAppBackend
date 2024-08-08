import express from "express";
import logger from "morgan";
import conn, { DB } from "./src/db/conn.js";
import errorHandler from "./src/error/errorHandler.js";
import movieRouter from "./src/router/movieRouter.js";
import reviewRouter from "./src/router/reviewRouter.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import dotenv from "dotenv";
import * as fs from "node:fs";

const app = express();
let swaggerFile = fs.readFileSync("./swagger-output.json");
swaggerFile = JSON.parse(swaggerFile);

dotenv.config({
  path: "../.env",
});

const { DB_URL, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE, WHITELIST_ORIGIN } =
  process.env;

try {
  await DB.createPool({
    DB_URL,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_DATABASE,
  });
} catch (e) {
  console.error(e);
}

// JSON 파싱 미들웨어 등록
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/movie", movieRouter);
app.use("/api/review", reviewRouter);

app.use(errorHandler);

app.listen(4000, async () => {
  await conn.initTables();
  console.log(`Server is running at http://localhost:4000`);
});

import express from "express";
import logger from "morgan";
import conn from "./src/db/conn.js";
import errorHandler from "./src/error/errorHandler.js";
import movieRouter from "./src/router/movieRouter.js";
import reviewRouter from "./src/router/reviewRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" with { type: "json" };

const app = express();

// JSON 파싱 미들웨어 등록
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api", movieRouter);
app.use("/api/movie", movieRouter);

app.use(errorHandler);

app.listen(4000, async () => {
  await conn.initTables();
  console.log(`Server is running at http://localhost:4000`);
});

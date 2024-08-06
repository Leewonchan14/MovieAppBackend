import swaggerAutogen from "swagger-autogen";
import movieConverter from "./src/converter/movieConverter.js";

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:4000",
  basePath: "/api",
  definitions: {
    MovieDetail: movieConverter.toMovieDetail(),
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/router/movieRouter.js"];

swaggerAutogen()(outputFile, routes, doc);

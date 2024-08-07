import express from "express";
import movieController from "../controller/movieController.js";
import "express-async-errors";

const movieRouter = express.Router({
  mergeParams: false,
});

movieRouter.get("/", movieController.getMovieList);
movieRouter.get("/:movieId", movieController.getMovieDetail);

movieRouter.post("/", movieController.createMovie);

movieRouter.delete("/", movieController.deleteMovie);

export default movieRouter;

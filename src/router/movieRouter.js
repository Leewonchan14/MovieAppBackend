import express from "express";
import movieController from "../controller/movieController.js";
import 'express-async-errors';

const movieRouter = express.Router({
  mergeParams: false,
});

movieRouter.get("/movie", movieController.getMovieList);
movieRouter.get("/movie/:movieId", movieController.getMovieDetail);

movieRouter.post("/movie", movieController.createMovie);

movieRouter.delete("/movie", movieController.deleteMovie);


export default movieRouter;
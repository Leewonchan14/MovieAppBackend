import express from "express";
import "express-async-errors";
import reviewController from "../controller/reviewController.js";

const reviewRouter = express.Router({
  mergeParams: false,
});

reviewRouter.get("/movie/:movieId", reviewController.getReviewByMovie);
reviewRouter.post("/", reviewController.createReview);

export default reviewRouter;

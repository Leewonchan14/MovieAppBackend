import CustomError from "../error/CustomError.js";
import reviewService from "../service/review/reviewService.js";
import reviewConverter from "../converter/reviewConverter.js";
import { InRange, NotBlank, NumberType, PageValid } from "../validator/commonValidator.js";
import { MovieIdExist } from "../validator/movieValidator.js";

export default {
  getReviewById: async (req, res, next) => {
    const { reviewId } = req.params;

    NumberType("reviewId", reviewId);

    const newReview = await reviewService.getReviewById({ reviewId });

    res.status(200).json(reviewConverter.toReviewDetail(newReview));
  },

  createReview: async (req, res, next) => {
    const { movieId, content, rating } = req.body;

    NotBlank("content", content);
    InRange("rating", rating, 0, 5);
    await MovieIdExist(movieId);

    const newReviewId = await reviewService.createReview({
      movieId,
      content,
      rating,
    });

    res.status(200).json({
      reviewId: newReviewId,
    });
  },

  getReviewByMovie: async (req, res, next) => {
    const { movieId } = req.params;
    const { page, pageSize, minRating = 0 } = req.query;
    
    PageValid({ page, pageSize });
    InRange("minRating", minRating, 0, 5);
    await MovieIdExist(movieId);

    const { movie, reviews } = await reviewService.getReviewByMovie({
      movieId,
      page,
      pageSize,
      minRating,
    });

    res.status(200).json(reviewConverter.toReviewPage(movie, reviews));
  },
};

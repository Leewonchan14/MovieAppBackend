import CustomError from "../error/CustomError.js";
import reviewService from "../service/review/reviewService.js";
import reviewConverter from "../converter/reviewConverter.js";

export default {
  createReview: async (req, res, next) => {
    const { movieId, content, rating } = req.body;

    if (
      isNaN(movieId) ||
      typeof content !== "string" ||
      content.length === 0 ||
      isNaN(rating) ||
      !(0 <= Number(rating) && Number(rating) <= 5)
    ) {
      throw CustomError.BAD_REQUEST;
    }

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
    const { page, pageSize } = req.query;

    if (!movieId || isNaN(movieId)) {
      throw CustomError.BAD_REQUEST;
    }

    if (isNaN(page) || isNaN(pageSize)) {
      throw CustomError.BAD_REQUEST_PAGINATION;
    }

    const { movie, reviews } = await reviewService.getReviewByMovie({
      movieId,
      page,
      pageSize,
    });

    res.status(200).json(reviewConverter.toReviewPage(movie, reviews));
  },
};

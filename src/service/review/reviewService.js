import reviewRepository from "../../repository/reviewRepository.js";
import movieRepository from "../../repository/movieRepository.js";
import CustomError from "../../error/CustomError.js";

export default {
  getReviewById: async ({ reviewId }) => {
    const findReview = await reviewRepository.findById({reviewId})
    if (!findReview) {
      throw CustomError.NOT_FOUNT_REVIEW;
    }

    return findReview;
  },

  createReview: async ({ movieId, content, rating }) => {
    const findMovie = await movieRepository.findById({ movieId });
    if (!findMovie || !!findMovie.isDeleted === true) {
      throw CustomError.NOT_FOUND_MOVIE;
    }

    return await reviewRepository.save({ movieId, content, rating });
  },

  getReviewByMovie: async ({ movieId, page, pageSize, minRating }) => {
    const findMovie = await movieRepository.findById({ movieId });
    if (!findMovie || !!findMovie.isDeleted === true) {
      throw CustomError.NOT_FOUND_MOVIE;
    }

    const reviews = await reviewRepository.findByMovieId({
      movieId,
      page,
      pageSize,
      minRating,
      orderBy: "order by createdAt desc",
    });

    return { movie: findMovie, reviews };
  },
};

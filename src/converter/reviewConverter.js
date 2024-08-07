import movieConverter from "./movieConverter.js";

export default {
  toReviewPage(movie, reviews){
    return {
      movie: movieConverter.toMovieDetail(movie),
      reviews: reviews.map(review => this.toReviewDetail(review)),
    }
  },

  toReviewDetail(review) {
    return {
      reviewId: review ? review.reviewId : 0,
      content: review ? review.content : "string",
      rating: review ? review.rating : 0.0,
      createdAt: review ? review.createdAt : (new Date()).toISOString(),
      updatedAt: review ? review.updatedAt : (new Date()).toISOString(),
      isDeleted: review ? !!review.isDeleted : false,
    };
  }
}
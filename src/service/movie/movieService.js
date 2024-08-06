import movieRepository from "../../repository/movieRepository.js";
import CustomError from "../../error/CustomError.js";

export default {
  getMovieDetail: async ({movieId}) => {
    const findMovie = await movieRepository.findById({movieId})
    if (!findMovie || !!findMovie.isDeleted === true) {
      throw CustomError.NOT_FOUND_MOVIE;
    }
    return findMovie;
  },

  createMovie: async ({title, genre}) => {
    return await movieRepository.save({title, genre});
  },

  deleteMovie: async ({movieId}) => {
    const findMovie = await movieRepository.findById({movieId})
    if (!findMovie) {
      throw CustomError.NOT_FOUND_MOVIE;
    }
    return await movieRepository.delete({movie :findMovie});
  },
}
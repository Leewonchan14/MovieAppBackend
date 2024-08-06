import movieService from "../service/movie/movieService.js";
import CustomError from "../error/CustomError.js";
import {MOVIE_GENRE} from "../db/tables.js";
import movieConverter from "../converter/MovieConverter.js";

export default {
  getMovieDetail: async (req, res, next) => {
    const {movieId} = req.params;

    if (!isFinite(movieId)) {
      throw CustomError.BAD_REQUEST;
    }

    const findMovie = await movieService.getMovieDetail({movieId});
    res.json(movieConverter.toMovieDetail(findMovie));
  },

  createMovie: async (req, res, next) => {
    const {title, genre} = req.body;

    if (typeof title !== "string" || typeof genre !== 'string' || !MOVIE_GENRE.includes(genre)) {
      throw CustomError.BAD_REQUEST;
    }

    const newMovieId = await movieService.createMovie({title, genre});
    res.json({
      movieId: newMovieId,
    });
  },


  deleteMovie: async (req, res, next) => {
    const {movieId} = req.body;

    if (!isFinite(movieId)) {
      throw CustomError.BAD_REQUEST;
    }

    await movieService.deleteMovie({movieId});
    res.status(200).json({
      message: "ok",
    })
  }
}
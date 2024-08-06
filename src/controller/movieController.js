import movieService from "../service/movie/movieService.js";
import CustomError from "../error/CustomError.js";
import {MOVIE_GENRE} from "../db/tables.js";
import movieConverter from "../converter/MovieConverter.js";

export default {
  getMovieDetail: async (req, res, next) => {
    const {movieId} = req.params;

    if (isNaN(movieId)) {
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

    if (isNaN(movieId)) {
      throw CustomError.BAD_REQUEST;
    }

    await movieService.deleteMovie({movieId});
    res.status(200).json({
      message: "ok",
    })
  },

  getMovieList: async (req, res, next) => {
    const {page, pageSize} = req.query;

    if (isNaN(page) || isNaN(pageSize)) {
      throw CustomError.BAD_REQUEST_PAGINATION;
    }

    const findMovies = await movieService.getMovieList({page, pageSize});

    res.status(200).json(findMovies.map(movieConverter.toMovieDetail));
  }
}
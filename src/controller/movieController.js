import movieService from "../service/movie/movieService.js";
import movieConverter from "../converter/MovieConverter.js";
import { NotBlank, PageValid } from "../validator/commonValidator.js";
import { MovieGenre, MovieIdExist } from "../validator/movieValidator.js";

export default {
  getMovieDetail: async (req, res, next) => {
    /*
    #swagger.responses[200] = {
      schema: {$ref: "#/definitions/MovieDetail"}
    }
    */

    const { movieId } = req.params;

    await MovieIdExist('movieId', movieId);

    const findMovie = await movieService.getMovieDetail({ movieId });
    res.json(movieConverter.toMovieDetail(findMovie));
  },

  createMovie: async (req, res, next) => {
    const { title, genre } = req.body;

    NotBlank("title", title);
    MovieGenre('genre', genre);

    const newMovieId = await movieService.createMovie({ title, genre });
    res.json({
      movieId: newMovieId,
    });
  },

  deleteMovie: async (req, res, next) => {
    const { movieId } = req.body;

    await MovieIdExist("movieId", movieId);

    await movieService.deleteMovie({ movieId });
    res.status(200).json({
      message: "ok",
    });
  },

  getMovieList: async (req, res, next) => {
    const { page, pageSize } = req.query;

    PageValid({ page, pageSize });

    const findMovies = await movieService.getMovieList({ page, pageSize });

    res.status(200).json(findMovies.map(movieConverter.toMovieDetail));
  },
};

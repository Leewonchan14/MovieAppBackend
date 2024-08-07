import { MOVIE_GENRE } from "../db/tables.js";
import movieRepository from "../repository/movieRepository.js";
import CustomError from "../error/CustomError.js";

export const MovieGenre = (key, value) => {
  if (!MOVIE_GENRE.includes(value))
    throw new CustomError(400, `${key}는 장르에 없습니다.`);
};

export const MovieIdExist = async (key, value) => {
  const movieId = value;
  if (isNaN(movieId)) {
    throw new CustomError(400, `${key}가 잘못 되었습니다.`);
  }

  const findMovie = await movieRepository.findById({ movieId });
  if (!findMovie || !!findMovie.isDeleted === true) {
    throw CustomError.NOT_FOUND_MOVIE;
  }
};

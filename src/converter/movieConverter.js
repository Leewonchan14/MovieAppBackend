export default class movieConverter {
  static toMovieDetail(movie) {
    return {
      ...movie,
      isDeleted: !!movie.isDeleted,
    };
  }
}

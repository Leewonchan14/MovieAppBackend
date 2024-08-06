export default {
  toMovieDetail: (movie) => ({
    movieId: movie ? movie.movieId : 0,
    title: movie ? movie.title : "string",
    genre: movie ? movie.genre : 'string',
    createdAt: movie ? movie.createdAt : (new Date()).toISOString(),
    updatedAt: movie ? movie.updatedAt : (new Date()).toISOString(),
    isDeleted: movie ? !!movie.isDeleted : false,
  }),
};

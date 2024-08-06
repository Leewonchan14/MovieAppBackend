import conn from "../db/conn.js";

export default {
  findAll: async () => {
    return await conn.execute("select * from movie");
  },
  findById: async ({movieId}) => {
    const findMovies = await conn.execute("select * from movie where movieId = ? limit 1", [movieId]);
    return findMovies[0];
  },
  save: async ({title, genre}) => {
    const {
      insertId
    } = await conn.execute("insert into movie (title, genre) values (? ,?)", [title, genre])
    return insertId;
  },

  delete: async ({movie}) => {
    const {affectedRows, changedRows} = await conn.execute("update movie set isDeleted = 1 where movieId = ?;" , [movie.movieId])
    return  affectedRows
  }
}
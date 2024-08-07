import conn from "../db/conn.js";

export default {
  async save({ movieId, content, rating }) {
    const { insertId } = await conn.execute(
      "insert into review (movieId, content, rating) values (? ,? ,?)",
      [movieId, content, rating]
    );

    return insertId;
  },

  async findByMovieId({ movieId, page, pageSize, orderBy }) {
    return await conn.execute(
      `select *
       from review
       where movieId = ?
         and isDeleted = 0 ${orderBy}
       limit ${page * pageSize}, ${pageSize};
      `
      , [movieId]
    );
  },
};

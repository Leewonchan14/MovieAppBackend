import conn from "../db/conn.js";

export default {
  async save({ movieId, content, rating }) {
    const { insertId } = await conn.execute(
      "insert into review (movieId, content, rating) values (? ,? ,?)",
      [movieId, content, rating]
    );

    return insertId;
  },

  async findByMovieId({ movieId, page, pageSize, minRating, orderBy }) {
    return await conn.execute(
      `select *
       from review
       where movieId = ?
         and rating >= ?
         and isDeleted = 0 ${orderBy}
       limit ${page * pageSize}, ${pageSize};
      `,
      [movieId, minRating]
    );
  },

  async findById({ reviewId }) {
    let findReviews = await conn.execute(
      `select *
       from review
       where isDeleted = 0
         and reviewId = ?`,
      [reviewId]
    );
    return findReviews[0];
  },
};

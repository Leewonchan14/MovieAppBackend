export const MOVIE_GENRE = ['ACTION', 'COMEDY', 'ROMANCE'];

export default {
  movie:
      `create table if not exists movie
       (
           movieId   bigint primary key auto_increment    not null,
           title     varchar(255)                         not null,
           genre     enum ('ACTION', 'COMEDY', 'ROMANCE') not null,
           isDeleted boolean   default false              not null,
           createdAt timestamp default current_timestamp,
           updatedAt timestamp default current_timestamp on update current_timestamp
       );`
  ,
  review:
      `create table if not exists review
       (
           reviewId  bigint primary key auto_increment,
           movieId   bigint,
           userId    bigint,
           content   text,
           rating    float,
           isDeleted boolean   default false,
           createdAt timestamp default current_timestamp,
           updatedAt timestamp default current_timestamp on update current_timestamp,
           foreign key (movieId) references movie (movieId)
       )`,
}

export default class CustomError extends Error {
  static BAD_REQUEST = new CustomError(400, "잘못된 요청입니다.");
  static BAD_REQUEST_PAGINATION = new CustomError(
    400,
    "page 또는 pageSize가 잘못 되었습니다."
  );

  static NOT_FOUND_MOVIE = new CustomError(404, "영화를 찾을 수 없습니다.");
  static NOT_FOUNT_REVIEW = new CustomError(404, "리뷰를 찾을 수 없습니다.");

  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
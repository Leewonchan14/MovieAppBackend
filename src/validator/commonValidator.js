import CustomError from "../error/CustomError.js";

export const NotBlank = (key, value) => {
  if (/.+/.test(value)) return;
  throw new CustomError(400, `${key}는 빈값일 수 없습니다.`);
};

export const NumberType = (key, value) => {
  if (isNaN(value)) return;
  throw new CustomError(400, `${key}는 숫자여야 합니다.`);
};

export const Positive = (key, value) => {
  NumberType(key, value);
  if (Number(value) > 0) return;
  throw new CustomError(400, `${key}는 양수여야 합니다.`);
};

export const PageValid = ({ page, pageSize }) => {
  Positive("page", page);
  Positive("pageSize", pageSize);
};

export const LessEqual = (key, value, max) => {
  NumberType(key, value);
  if (Number(value) <= max) return;
  throw new CustomError(400, `${key}는 ${max}보다 작거나 같아야 합니다.`);
};

export const BiggerEqual = (key, value, min) => {
  NumberType(key, value);
  if (Number(value) >= min) return;
  throw new CustomError(400, `${key}는 ${min}보다 크거나 같아야 합니다.`);
};

export const InRange = (key, value, min, max) => {
  try {
    LessEqual(key, value, max);
    BiggerEqual(key, value, min);
  } catch (e) {
    throw new CustomError(400, `${key}는 ${min}과 ${max} 사이여야 합니다.`);
  }
};

export const InLength = (key, value, min, max) => {
  let regexp = new RegExp(`^.{${min},${max}}$`);
  if (regexp) return;
  throw new CustomError(400, `${key}의 글자수는 ${min}이상 ${max}이하 여야 합니다.`);
};

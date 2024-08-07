import CustomError from "../error/CustomError.js";

export const NotBlank = (key, value) => {
  if (!/.+/.test(value))
    throw new CustomError(400, `${key}는 빈값일 수 없습니다.`);
};

export const NumberType = (key, value) => {
  if (!/[0-9]+/.test(value))
    throw new CustomError(400, `${key}는 숫자여야 합니다.`);
};

export const Positive = (key, value) => {
  NumberType(key, value);
  if (!(Number(value) > 0))
    throw new CustomError(400, `${key}는 양수여야 합니다.`);
};

export const PageValid = ({ page, pageSize }) => {
  Positive("page", page);
  Positive("pageSize", pageSize);
};

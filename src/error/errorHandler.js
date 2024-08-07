import CustomError from "./CustomError.js";

export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { status, message } = err;
    return res.status(status).json({
      message,
      body: req.body,
      query: req.query,
    });
  }

  console.error(err);

  res.status(500).json({
    message: err.message,
    body: req.body,
    query: req.query,
  });
};

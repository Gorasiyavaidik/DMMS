export class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorMiddleware = (error, req, res, next) => {
  // console.log("-------------INSIDE ERROR HANDLER-------------");

//  console.error(error.message);

  const message = error.message || "Contact at Student Section , Try After sometime";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: "failed",
    message,
    code: statusCode,
    data: res.data,
  });
};

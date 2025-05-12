const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const responseMiddleware = (req, res, next) => {
  if (res.data !== undefined) {
    return res.status(res.statusCode || 200).json({
      error: false,
      message: res.data,
    });
  }

  if (res.err) {
    const statusCode =
      res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    return res.status(statusCode).json({
      error: true,
      message:
        res.err.message || messageList[statusCode] || "Internal Server Error",
    });
  }

  return res.status(500).json({
    error: true,
    message: " Internal Server Error ",
  });
};

export { responseMiddleware };

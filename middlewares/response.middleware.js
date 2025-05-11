const responseMiddleware = (req, res, next) => {
  if (res.data !== undefined) {
    return res.status(res.statusCode || 200).json(res.data);
  }

  if (res.err) {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    return res.status(statusCode).json({
      error: res.err.message || "Internal Server Error"
    });
  }

  return res.status(500).json({
    error: "No response data or error provided"
  });
};

export { responseMiddleware };



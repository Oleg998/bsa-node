const responseMiddleware = (req, res, next) => {
  const responseMiddleware = (req, res, next) => {
    res.sendSuccess = (data) => {
      res.status(200).json({ success: true, data });
    };

    res.sendBadRequest = (message) => {
      res.status(400).json({ success: false, error: message });
    };

    res.sendNotFound = (message = "Not found") => {
      res.status(404).json({ success: false, error: message });
    };

    next();
  };

  next();
};

export { responseMiddleware };

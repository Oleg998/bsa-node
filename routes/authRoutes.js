import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await authService.login({ email });
      res.data = user;
      next();
    } catch (err) {
      next(err); 
    }
  },
  responseMiddleware
);

export { router };

import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const user = await authService.login(data);
    if (!user) {
      res.status(404).json({
        error: true,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      error: false,
      message: "Login successful",
      user: user,
    });
  } catch (err) {
    next(err); 
  }
});

export { router };

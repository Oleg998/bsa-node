  import { Router } from "express";
  import { userService } from "../services/userService.js";
  import { responseMiddleware } from "../middlewares/response.middleware.js";
  import {
    createUserValid,
    updateUserValid,
  } from "../middlewares/user.validation.middleware.js";

  const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.data = users;
  } catch (error) {
    res.err = error;
    res.status(500);
  }
  next();
}, responseMiddleware);


router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.search({ id }); 
    
    if (!user) {
      res.status(404);
      res.err = new Error("User not found");
    } else {
      res.data = user;
    }
  } catch (error) {
    res.status(500);
    res.err = error;
  }
  next();
}, responseMiddleware);


router.post(
  "/",
  createUserValid,
  async (req, res, next) => {
    try {
      const { email, phone  } = req.body;
      const existingEmail = await userService.search({ email });
      const existingPhone = await userService.search({ phone });
      if (existingEmail || existingPhone) {
        res.status(400);
        res.err = new Error("Email or phone in use");
        return next();
      }
      const newUser = await userService.create(req.body);

      res.status(201);
      res.data = newUser;
    } catch (error) {
      res.status(500);
      res.err = error;
    }
    next();
  },
  responseMiddleware
);

router.patch(
  "/:id",
  updateUserValid,
  async (req, res, next) => {
    try {
      const { email, phone } = req.body;
      const userId = req.params.id;

      if (email) {
        const existingEmailUser = await userService.search({ email });
        if (existingEmailUser && existingEmailUser.id !== userId) {
          res.status(400);
          res.err = new Error("Email is already in use");
          return next();
        }
      }

      if (phone) {
        const existingPhoneUser = await userService.search({ phone });
        if (existingPhoneUser && existingPhoneUser.id !== userId) {
          res.status(400);
          res.err = new Error("Phone is already in use");
          return next();
        }
      }

      const updatedUser = await userService.update(userId, req.body);
      if (!updatedUser) {
        res.status(404);
        res.err = new Error("User not found");
        return next();
      }

      res.data = updatedUser;
    } catch (error) {
      res.status(500);
      res.err = error;
    }

    next();
  },
  responseMiddleware
);


router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await userService.delete(req.params.id);
    if (!deletedUser) {
      res.status(404);
      res.err = new Error("User not found");
    } else {
      res.data = { message: "User deleted successfully" };
    }
  } catch (error) {
    res.status(500);
    res.err = error;
  }
  next();
}, responseMiddleware);

  export { router };

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
    const user = await userService.getById(req.params.id);
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


router.post("/", createUserValid, async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201);
    res.data = newUser;
  } catch (error) {
    res.status(500);
    res.err = error;
  }
  next();
}, responseMiddleware);


router.patch("/:id", updateUserValid, async (req, res, next) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404);
      res.err = new Error("User not found");
    } else {
      res.data = updatedUser;
    }
  } catch (error) {
    res.status(500);
    res.err = error;
  }
  next();
}, responseMiddleware);


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

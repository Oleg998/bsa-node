import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    res.sendSuccess(users);
  } catch (error) {
    res.sendBadRequest("Failed to retrieve users: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return res.sendNotFound("User not found");
    res.sendSuccess(user);
  } catch (error) {
    res.sendBadRequest("Failed to get user: " + error.message);
  }
});

router.post("/", createUserValid, async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.sendCreated(newUser);
  } catch (error) {
    res.sendBadRequest("Failed to create user: " + error.message);
  }
});

router.patch("/:id", updateUserValid, async (req, res) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);
    if (!updatedUser) return res.sendNotFound("User not found");
    res.sendSuccess(updatedUser);
  } catch (error) {
    res.sendBadRequest("Failed to update user: " + error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userService.delete(req.params.id);
    if (!deletedUser) return res.sendNotFound("User not found");
    res.sendSuccess({ message: "User successfully deleted" });
  } catch (error) {
    res.sendBadRequest("Failed to delete user: " + error.message);
  }
});

export { router };

import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const fighters = await fighterService.getAll();
      res.data = fighters;
    } catch (error) {
      res.status(500);
      res.err = error;
    }
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const fighter = await fighterService.search({ id });
      if (!fighter) {
        res.status(404);
        res.err = new Error("Fighter not found");
      } else {
        res.data = fighter;
      }
    } catch (error) {
      res.status(500);
      res.err = error;
    }
    next();
  },
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  async (req, res, next) => {
    try {
      const { name, health = 85 } = req.body;
      const existingName = await fighterService.search({ name });
      if (existingName) {
        res.status(400);
        res.err = new Error("Name  in use");
        return next();
      }
      const fighterData = { ...req.body, health };
      const newFighter = await fighterService.create(fighterData);

      res.status(201);
      res.data = newFighter;
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
  updateFighterValid,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const userId = req.params.id;

      if (name) {
        const existingName = await fighterService.search({ name });
        if (existingName && existingName.id !== userId) {
          res.status(400);
          res.err = new Error("Name is already in use");
          return next();
        }
      }
      const updatedFighter = await fighterService.update(userId, req.body);
      if (!updatedFighter) {
        res.status(404);
        res.err = new Error("Fighter not found");
        return next();
      }

      res.data = updatedFighter;
    } catch (error) {
      res.status(500);
      res.err = error;
    }

    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const deletedFighter = await fighterService.delete(req.params.id);
      if (!deletedFighter) {
        res.status(404);
        res.err = new Error("Fighter not found");
      } else {
        res.data = { message: "Fighter deleted successfully" };
      }
    } catch (error) {
      res.status(500);
      res.err = error;
    }
    next();
  },
  responseMiddleware
);

export { router };

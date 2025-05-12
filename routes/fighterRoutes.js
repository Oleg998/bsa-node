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
      const fighter = await fighterService.getById(req.params.id);
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
      const { name} = req.body;
      const existingName = await fighterService.search({ name });
      

      if (existingName) {
        res.status(400);
        res.err = new Error("Name fighter in use");
        return next();
      }

      const newFighter = await fighterService.create(req.body);
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
      const updatedFighter = await fighterService.update(
        req.params.id,
        req.body
      );
      if (!updatedFighter) {
        res.status(404);
        res.err = new Error("Fighter not found");
      } else {
        res.data = updatedFighter;
      }
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

import { FIGHTER } from "../models/fighter.js";

const isValidPower = (power) => {
  const numericPower = Number(power);
  return numericPower >= 1 && numericPower <= 100;
};

const isValidDefense = (defense) => {
  const numericDefense = Number(defense);
  return numericDefense >= 1 && numericDefense <= 10;
};

const isValidHealth = (health) => {
  const numericHealth = Number(health);
  return numericHealth >= 80 && numericHealth <= 120;
};

const createFighterValid = (req, res, next) => {
  const body = req.body;

  const allowedKeys = Object.keys(FIGHTER).filter((key) => key !== "id");
  const requiredKeys = ["name", "power", "defense"];

  for (const key of Object.keys(body)) {
    if (!allowedKeys.includes(key)) {
      return res.status(400).json({
        message: `Extra field: ${key}`,
      });
    }
  }

  for (const key of requiredKeys) {
    if (!(key in body)) {
      return res.status(400).json({
        message: `Required field is missing: ${key}`,
      });
    }
  }

  for (const key of Object.keys(body)) {
    const value = body[key];

    if (key === "name") {
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          message: "Name must be a non-empty string",
        });
      }
    }

    if (key === "health" && !isValidHealth(value)) {
      return res.status(400).json({
        message: "Health must be a number from 80 to 120",
      });
    }

    if (key === "power" && !isValidPower(value)) {
      return res.status(400).json({
        message: "Power must be a number from 1 to 100",
      });
    }

    if (key === "defense" && !isValidDefense(value)) {
      return res.status(400).json({
        message: "Defense must be a number from 1 to 10",
      });
    }
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const body = req.body;

  const allowedKeys = Object.keys(FIGHTER).filter((key) => key !== "id");
  const providedKeys = Object.keys(body);

  if (providedKeys.length === 0) {
    return res.status(400).json({
      message: "At least one field must be provided for update",
    });
  }

  for (const key of providedKeys) {
    if (!allowedKeys.includes(key)) {
      return res.status(400).json({
        message: `Extra field: ${key}`,
      });
    }
  }

  next();
};

export { createFighterValid, updateFighterValid };

import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const body = req.body;

  for (const key in USER) {
   
    const value = body[key];

    if (!value || typeof value !== "string") {
      return res.status(400).json({ message: `Invalid or missing '${key}'` });
    }

    if (key === "email" && !value.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (key === "password" && value.length < 4) {
      return res
        .status(400)
        .json({ message: "Password must be at least 4 characters" });
    }
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const body = req.body;

  for (const key in body) {
    if (!USER.hasOwnProperty(key)) {
      return res.status(400).json({ message: `Unknown field '${key}'` });
    }

    const value = body[key];

    if (typeof value !== "string") {
      return res.status(400).json({ message: `Invalid type for '${key}'` });
    }

    if (key === "email" && !value.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (key === "password" && value.length < 4) {
      return res
        .status(400)
        .json({ message: "Password must be at least 4 characters" });
    }
  }

  next();
};

export { createUserValid, updateUserValid };

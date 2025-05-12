import { USER } from "../models/user.js";

const isValidGmail = (email) => typeof email === "string" && email.endsWith("@gmail.com");
const isValidPhone = (phone) => typeof phone === "string" && /^\+380\d{9}$/.test(phone);
const isValidPassword = (password) => typeof password === "string" && password.length >= 4;

const createUserValid = (req, res, next) => {
  const body = req.body;

  for (const key in USER) {
    if (key === "id") continue; 

    const value = body[key];

    if (typeof value !== "string" || !value.trim()) {
      return res.status(400).json({ message: `Field '${key}' is required and must be a non-empty string` });
    }

    if (key === "email" && !isValidGmail(value)) {
      return res.status(400).json({ message: "Email must be a valid Gmail address" });
    }

    if (key === "phone" && !isValidPhone(value)) {
      return res.status(400).json({ message: "Phone must match format +380xxxxxxxxx" });
    }

    if (key === "password" && !isValidPassword(value)) {
      return res.status(400).json({ message: "Password must be at least 4 characters" });
    }
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const body = req.body;
  const keys = Object.keys(body);

  if (keys.length === 0) {
    return res.status(400).json({ message: "At least one field is required to update" });
  }

  const validKeys = Object.keys(USER).filter((key) => key !== "id");
  const hasValidKey = keys.some((key) => validKeys.includes(key));

  if (!hasValidKey) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  for (const key of keys) {
    if (!USER.hasOwnProperty(key)) {
      return res.status(400).json({ message: `Unknown field '${key}'` });
    }

    const value = body[key];

    if (typeof value !== "string") {
      return res.status(400).json({ message: `Field '${key}' must be a string` });
    }

    if (key === "email" && !isValidGmail(value)) {
      return res.status(400).json({ message: "Email must be a valid Gmail address" });
    }

    if (key === "phone" && !isValidPhone(value)) {
      return res.status(400).json({ message: "Phone must match format +380xxxxxxxxx" });
    }

    if (key === "password" && !isValidPassword(value)) {
      return res.status(400).json({ message: "Password must be at least 4 characters" });
    }
  }

  next();
};

export { createUserValid, updateUserValid };


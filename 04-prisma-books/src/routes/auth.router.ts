import express from "express";
import { login, register } from "../controllers/auth.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { loginRules } from "../rules/auth.rules.ts";
import { createUserRules } from "../rules/user.rules.ts";

// Create a Resource router
export const authRouter = express.Router();

/**
 * POST /login
 *
 * Log in a user
 */
authRouter.post("/login", loginRules, validateRequest, login);

/**
 * POST /register
 *
 * Register a new user
 */
authRouter.post("/register", createUserRules, validateRequest, register);

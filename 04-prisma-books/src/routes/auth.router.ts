import express from "express";
import { register } from "../controllers/auth.controller.ts";
import { createUserRules } from "../rules/user.rules.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

// Create a Resource router
export const authRouter = express.Router();

/**
 * POST /register
 *
 * Register a new user
 */
authRouter.post("/register", createUserRules, validateRequest, register);

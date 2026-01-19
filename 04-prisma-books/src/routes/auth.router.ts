import express from "express";
import { register } from "../controllers/auth.controller.ts";

// Create a Resource router
export const authRouter = express.Router();

/**
 * POST /register
 *
 * Register a new user
 */
authRouter.post("/register", register);

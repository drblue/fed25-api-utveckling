import express from "express";
import { getBooks, getProfile, updateProfile } from "../controllers/profile.controller.ts";

// Create a Profile router
export const profileRouter = express.Router();

/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
profileRouter.get("/", getProfile);

/**
 * GET /profile/books
 *
 * Get the authenticated user's books
 */
profileRouter.get("/books", getBooks);

/**
 * PATCH /profile
 *
 * Update the authenticated user's profile
 */
profileRouter.patch("/", updateProfile);

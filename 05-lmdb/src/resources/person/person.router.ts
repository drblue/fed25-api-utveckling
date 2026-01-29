import express from "express";
import { index, show, store } from "./person.controller.ts";

// Create a Person router
export const personRouter = express.Router();

/**
 * GET /people
 */
personRouter.get("/", index);

/**
 * GET /people/:personId
 */
personRouter.get("/:personId", show);

/**
 * POST /people
 */
personRouter.post("/", store);

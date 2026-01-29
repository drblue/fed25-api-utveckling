import express from "express";
import { destroy, index, show, store, update } from "./person.controller.ts";

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

/**
 * PATCH /people/:personId
 */
personRouter.patch("/:personId", update);

/**
 * DELETE /people/:personId
 */
personRouter.delete("/:personId", destroy);

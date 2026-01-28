import express from "express";
import { movieRouter } from "./resources/movie/movie.router.ts";

// Create a Root router
export const rootRouter = express.Router();

/**
 * GET /
 */
rootRouter.get("/", (_req, res) => {
	res.send({ status: "success", data: { message: "I AM MOVIE-DB-API, GIFES POPCORN PLZ 🍿", }});
});

/**
 * /movies
 */
rootRouter.use("/movies", movieRouter);

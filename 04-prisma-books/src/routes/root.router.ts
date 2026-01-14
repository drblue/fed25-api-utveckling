import express from "express";
import { authorsRouter } from "./authors.router.ts";
import { booksRouter } from "./books.router.ts";
import { publishersRouter } from "./publishers.router.ts";

// Create a Root router
export const rootRouter = express.Router();

/**
 * GET /
 */
rootRouter.get("/", (_req, res) => {
	res.send({ message: "I AM BOOKS API, BEEP BOOP" });
});

// Authors router
rootRouter.use("/authors", authorsRouter);

// Books router
rootRouter.use("/books", booksRouter);

// Publishers router
rootRouter.use("/publishers", publishersRouter);

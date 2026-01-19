import express from "express";
import { basic } from "../middlewares/auth/basic.ts";
import { authRouter } from "./auth.router.ts";
import { authorsRouter } from "./authors.router.ts";
import { booksRouter } from "./books.router.ts";
import { profileRouter } from "./profile.router.ts";
import { publishersRouter } from "./publishers.router.ts";

// Create a Root router
export const rootRouter = express.Router();

/**
 * GET /
 */
rootRouter.get("/", (_req, res) => {
	res.send({ status: "success", data: { message: "I AM BOOKS API, BEEP BOOP" }});
});

// Authors router
rootRouter.use("/authors", authorsRouter);

// Books router
rootRouter.use("/books", booksRouter);

// Publishers router
rootRouter.use("/publishers", publishersRouter);

// Auth router
rootRouter.use(authRouter);

// Profile router
rootRouter.use("/profile", basic, profileRouter);

import express from "express";
import _ from "lodash";
import morgan from "morgan";
import { authorsRouter } from "./routes/authors.router.ts";
import { booksRouter } from "./routes/books.router.ts";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

/**
 * GET /
 */
app.get("/", (_req, res) => {
	res.send({ message: "I AM API, BEEP BOOP" });
});

// Authors router
app.use(authorsRouter);

// Books router
app.use(booksRouter);

/**
 * Catch-all route 🛟
 */
app.use((req, res) => {
	res.status(404).send({ message: `Cannot ${req.method} ${req.path}` });
});

export default app;

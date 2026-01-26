import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import _ from "lodash";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound.ts";
import { rootRouter } from "./routes/root.router.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

const app = express();
app.use(cookieParser());  // 🍪😋
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Use dem routes
app.use(rootRouter);

app.get("/yolo", () => {
	throw new Error("Crash test dummy");
});

/**
 * Catch-all route 🛟
 */
app.use(notFound);

/**
 * Handle errors
 */
app.use(errorHandler);

export default app;

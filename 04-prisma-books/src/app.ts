import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import _ from "lodash";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound.ts";
import { rootRouter } from "./routes/root.router.ts";

const app = express();
app.use(cookieParser());  // 🍪😋
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Use dem routes
app.use(rootRouter);

/**
 * Catch-all route 🛟
 */
app.use(notFound);

export default app;

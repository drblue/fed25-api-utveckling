import cors from "cors";
import express from "express";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import { rootRouter } from "./router.ts";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Initiate router
app.use(rootRouter);

// Not found
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;

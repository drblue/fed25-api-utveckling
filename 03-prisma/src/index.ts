import express from "express";
import _ from "lodash";
import morgan from "morgan";
import { prisma } from "./lib/prisma.ts";

// Declare config
const PORT = 3000;

// Create a new Express app
const app = express();

// Parse any incoming JSON
app.use(express.json());

// 🪵 Log information about the incoming requests using the `morgan` logging middleware
app.use(morgan("dev"));

/**
 * GET /
 */
app.get("/", (_req, res) => {
	res.send({ message: "I AM API, BEEP BOOP" });
});

/**
 * GET /phones
 *
 * Get all phones
 */
app.get("/phones", async (_req, res) => {
	// Query the database to get all phones
	const phones = await prisma.phones.findMany();

	// Respond with the phones
	res.send(phones);
});

/**
 * GET /users
 *
 * Get all users
 */
app.get("/users", async (_req, res) => {
	// Query the database to get all users
	const users = await prisma.users.findMany();

	// Respond with the users
	res.send(users);
});

/**
 * Catch-all route 🛟
 */
app.use((req, res) => {
	res.status(404).send({ message: `Cannot ${req.method} ${req.path}` });
});

/**
 * Start listening for incoming requests on port 3000
 */
app.listen(PORT, () => {
	// Will be invoked once the server has started listening
	console.log(`🥳 Yay, server started on http://localhost:${PORT}`);
});

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
	/*
	// Get all phones but only id, manufacturer and model columns
	// `SELECT id, manufacturer, model FROM phones`
	const phones = await prisma.phones.findMany({
		select: {
			id: true,
			manufacturer: true,
			model: true,
		},
	});
	*/

	/*
	// Get all Nokia-phones
	// `SELECT * FROM phones WHERE manufacturer = "Nokia"`
	const phones = await prisma.phones.findMany({
		where: {
			manufacturer: "Nokia",
		},
	});
	*/

	/*
	// Get all phones that has "s" in their manufacturer name
	// `SELECT * FROM phones WHERE manufacturer LIKE "%s%"`
	const phones = await prisma.phones.findMany({
		where: {
			manufacturer: {
				contains: "s"
			},
		},
	});
	*/

	/*
	// Get the first 2 phones
	// `SELECT * FROM phones LIMIT 3`
	const phones = await prisma.phones.findMany({
		take: 2,
	});
	*/

	/*
	// Get 2 phones but skip the first 4
	// `SELECT * FROM phones LIMIT 2 OFFSET 4`
	const phones = await prisma.phones.findMany({
		take: 2,
		skip: 4,
	});
	*/

	/*
	// Get all phones but sort them by manufacturer
	// `SELECT * FROM phones ORDER BY manufacturer ASC`
	const phones = await prisma.phones.findMany({
		orderBy: [
			{ manufacturer: "asc" },
		],
	});
	*/

	/*
	// Get all phones but sort them by manufacturer AND THEN model
	// `SELECT * FROM phones ORDER BY manufacturer ASC, model ASC`
	const phones = await prisma.phones.findMany({
		orderBy: [
			{ manufacturer: "asc" },
			{ model: "asc" },
		],
	});
	*/

	/*
	// Get the _first_ phone that matches our query
	// Returns an object OR `null` if no rows match
	// `SELECT * FROM phones WHERE manufacturer LIKE "Nok%" LIMIT 1`
	const phone = await prisma.phones.findFirst({
		where: {
			manufacturer: {
				startsWith: "Nok",
			},
		},
	});
	console.log("Phone:", phone);
	*/

	/*
	// Get a specfic phone
	// Returns an object OR `null` if no rows match
	// `SELECT * FROM phones WHERE id = 2`
	const phone = await prisma.phones.findUnique({
		where: {
			id: 2,
		},
	});
	console.log("Phone:", phone);
	*/

	/*
	// Get a specfic phone
	// Return an object OR throws a tantrum
	// `SELECT * FROM phones WHERE id = 2`
	try {
		const phone = await prisma.phones.findUniqueOrThrow({
			where: {
				id: 13,
			},
		});
		console.log("Phone:", phone);

		// Respond with the phones
		res.send(phone);
	} catch (err) {
		console.log("Probably didn't find phone");
		res.status(404).send({ message: "Probably didn't find phone" });
	}
	*/

	// Get all phones but only id, manufacturer and model columns
	// `SELECT id, manufacturer, model FROM phones`
	const phones = await prisma.phones.findMany({
		select: {
			id: true,
			manufacturer: true,
			model: true,
		},
	});

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

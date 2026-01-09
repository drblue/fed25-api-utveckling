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
 * --------------------------------------------------------
 * Phones
 * --------------------------------------------------------
 */

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

	try {
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

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * POST /phones
 *
 * Create a phone
 */
app.post("/phones", async (req, res) => {
	try {
		const user = await prisma.phones.create({
			data: req.body,
		});
		res.status(201).send(user);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * GET /phones/:phoneId
 *
 * Get a single phone
 */
app.get("/phones/:phoneId", async (req, res) => {
	const phoneId = Number(req.params.phoneId);
	if (!phoneId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		// Find phone based on the unique id
		const phone = await prisma.phones.findUniqueOrThrow({
			where: {
				id: phoneId,
			},
			include: {
				user: true,
			},
		});

		// Hello, this is dog 📞🐶
		res.send(phone);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * PATCH /phones/:phoneId
 *
 * Update a phone
 */
app.patch("/phones/:phoneId", async (req, res) => {
	const phoneId = Number(req.params.phoneId);
	if (!phoneId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const phone = await prisma.phones.update({
			where: { id: phoneId },
			data: req.body,
		});
		res.send(phone);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * DELETE /phones/:phoneId
 *
 * Delete a phone
 */
app.delete("/phones/:phoneId", async (req, res) => {
	const phoneId = Number(req.params.phoneId);
	if (!phoneId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		await prisma.phones.delete({
			where: { id: phoneId },
		});
		res.status(204).send();

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * --------------------------------------------------------
 * Users
 * --------------------------------------------------------
 */

/**
 * GET /users
 *
 * Get all users
 */
app.get("/users", async (_req, res) => {
	try {
		// Query the database to get all users
		const users = await prisma.users.findMany();

		// Respond with the users
		res.send(users);
	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * POST /users
 *
 * Create a user
 */
app.post("/users", async (req, res) => {
	try {
		const user = await prisma.users.create({
			data: req.body,
		});
		res.status(201).send(user);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * GET /users/:userId
 *
 * Get a single user
 */
app.get("/users/:userId", async (req, res) => {
	const userId = Number(req.params.userId);
	if (!userId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		// Find user based on the unique id
		const user = await prisma.users.findUniqueOrThrow({
			where: {
				id: userId,
			},
			include: {
				phones: true,
			},
		});

		// Hello, this is dog 🐶
		res.send(user);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * PATCH /users/:userId
 *
 * Update a user
 */
app.patch("/users/:userId", async (req, res) => {
	const userId = Number(req.params.userId);
	if (!userId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const user = await prisma.users.update({
			where: { id: userId },
			data: req.body,
		});
		res.send(user);

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
});

/**
 * DELETE /users/:userId
 *
 * Delete a user
 */
app.delete("/users/:userId", async (req, res) => {
	const userId = Number(req.params.userId);
	if (!userId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		await prisma.users.delete({
			where: { id: userId },
		});
		res.status(204).send();

	} catch (err) {
		console.error(err);
		res.status(500).send({ message: "Something went wrong when querying the database" });
	}
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

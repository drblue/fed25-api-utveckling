import express from "express";
import _ from "lodash";
import morgan from "morgan";
import oneliners from "./data/oneliners.json" with { type: "json" };
import { users } from "./data/users.ts";

// Declare config
const PORT = 3000;

// Create a new Express app
const app = express();

// Parse any incoming JSON
app.use(express.json());

// 🪵 Log information about the incoming requests using the `morgan` logging middleware
app.use(morgan("dev"));

// Listen for incoming GET-requests to "/"
app.get("/", (_req, res) => {
	res.send({ message: "Oh, hi there 😊" });
});

// Listen for incoming POST-requests to "/"
app.post("/", (_req, res) => {
	res.send({ message: "I'm not a mailbox 😡" });
});

// Listen for incoming GET-requests to "/coffee"
app.get("/coffee", (_req, res) => {
	res.send({
		can_you_have_too_much: false,
		coffee: "is good for you",
		do_i_need_moar_coffee: true,
		message: "Lolcats are funny",
		nicknames: [
			"coffee",
			"life-giving liquid",
			"black gold",
		],
	});
});

// Listen for incoming GET requests to "/joke"
app.get("/joke", (_req, res) => {
	// Somehow get all oneliners from `data/oneliners.json`
	// Get a random oneliner from the array of oneliners
	// Replace the hardcoded string with the random joke in the object below
	const joke = _.sample(oneliners);

	res.send({
		joke,
	});
});

// Listen for incoming GET-requests to "/lol"
app.get("/lol", (_req, res) => {
	res.send({ message: "I was wondering why the frisbee kept getting bigger and bigger, but then it hit me." });
});

// Listen for incoming GET-requests to "/users"
app.get("/users", (_req, res) => {
	res.send(users);
});

// Listen for incoming POST-requests to "/users"
app.post("/users", (req, res) => {
	console.log("Request body:", req.body);

	// Find the highest ID in the `users` array
	const maxId = Math.max(0, ...users.map(user => user.id));

	// Create the new user object
	const user = {
		...req.body,
		id: maxId + 1,
	}

	// Push the new user to the array (and append the next available ID)
	users.push(user);

	// Respond with the new user
	res.status(201).send(user);
});

// Listen for incoming GET-requests to "/users/{userId}"
app.get("/users/:userId", (req, res) => {
	// Get value of route parameter `userId` (and cast it to a Number)
	const userId = Number(req.params.userId);
	if (!userId) {
		res.status(400).send({ message: "Invalid User Id" });
		return;
	}

	// Find user with id `userId` in the `users` array
	const user = users.find((user) => user.id === userId);

	// Handle user not found (guard clause/early return)
	if (!user) {
		// Respond with user not found
		res.status(404).send({ message: "User Not Found" });
		return;
	}

	// Respond with the found user
	res.send(user);
});

// Catch-all route
app.use((req, res) => {
	res.status(404).send({ message: `Cannot ${req.method} ${req.path}` });
});

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	// Will be invoked once the server has started listening
	console.log(`🥳 Yay, server started on http://localhost:${PORT}`);
});

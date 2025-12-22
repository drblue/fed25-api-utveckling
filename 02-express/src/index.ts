import express from "express";

// Declare config
const PORT = 3000;

// Create a new Express app
const app = express();

// Listen for incoming GET-requests to "/"
app.get("/", (req, res) => {
	console.log("Someone requested my (g)root 🎄");
	console.log("Request method:", req.method);
	console.log("Request path:", req.path);
	res.send({ message: "Oh, hi there ☺️" });
});

// Listen for incoming POST-requests to "/"
app.post("/", (_req, res) => {
	console.log("Someone tried to mail me something 💌");
	res.send({ message: "I'm not a mailbox 😡" });
});

// Listen for incoming GET-requests to "/coffee"
app.get("/coffee", (_req, res) => {
	console.log("☕️😋 coffee yum");
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

// Listen for incoming GET-requests to "/lol"
app.get("/lol", (_req, res) => {
	res.send({ message: "I was wondering why the frisbee kept getting bigger and bigger, but then it hit me." });
});

// Listen for incoming GET-requests to "/users"
app.get("/users", (_req, res) => {
	res.send([
		{
			username: "johan",
			profile_picture: "https://thumb.ac-illust.com/3c/3cea0e36d984553348ca536f07ca7617_t.jpeg",
		},
		{
			username: "pelle",
			profile_picture: null,
		},
		{
			username: "kajsa",
			profile_picture: null,
		},
		{
			username: "mimmi",
			profile_picture: null,
		},
	]);
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

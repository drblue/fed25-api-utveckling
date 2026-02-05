/**
 * Socket Controller
 */
import { ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types.ts";
import Debug from "debug";
import { Server, Socket } from "socket.io";
import { prisma } from "../lib/prisma.ts";

// Create a new debug instance
const debug = Debug('chat:socket_controller');
debug("Socket Controller initialized");

export const handleConnection = (
	socket: Socket<ClientToServerEvents, ServerToClientEvents>,
	_io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
	// Yay someone connected to me

	// Listen for room list request
	socket.on("getRoomList", async (callback) => {
		debug("🏨 Got request for rooms");

		const rooms = await prisma.room.findMany({ orderBy: { name: "asc" } });
		debug("🏨 Found rooms, sending list of rooms %o", rooms);

		// Send list of rooms as acknowledgement of the event
		setTimeout(() => {
			callback(rooms);
		}, 1000);
	});

	// Listen for incoming chat messages
	socket.on("sendChatMessage", (payload) => {
		debug("📨 New chat message from %s: %o", socket.id, payload);

		// Broadcast message to everyone connected EXCEPT the sender
		socket.broadcast.emit("chatMessage", payload);
	});

	// Listen for a user join request
	socket.on("userJoinRequest", (username, callback) => {
		debug("👶🏻 User %s from socket %s wants to join the chat", username, socket.id);

		// Acknowledge request
		// Always let the user in (for now 😇)
		// We should probably check if the username is in use
		// and not allow the user to join if it's already taken
		if (username.toLowerCase().includes("bus-")) {
			callback({ success: false });
			return;
		}

		callback({ success: true });

		// Broadcast to everyone else that a new user has joined
		socket.broadcast.emit("userJoined", username, Date.now());
	});

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("Socket disconnected: %s", socket.id);
	});
}

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
	io: Server<ClientToServerEvents, ServerToClientEvents>
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
	socket.on("userJoinRequest", (username, roomId, callback) => {
		debug("👶🏻 User %s from socket %s wants to join room %s", username, socket.id, roomId);

		// Acknowledge request
		// Always let the user in (for now 😇)
		// We should probably check if the username is in use
		// and not allow the user to join if it's already taken
		if (username.toLowerCase().includes("bus-")) {
			callback({ success: false });
			return;
		}

		// Join room `roomId`
		socket.join(roomId);  // "69846c52e5bd692db4d14a0e"

		// All is well, let the user in
		callback({ success: true });

		// Broadcast to everyone in the room (including ourselves) that a user has joined
		io.to(roomId).emit("userJoined", username, Date.now());
	});

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("Socket disconnected: %s", socket.id);
	});
}

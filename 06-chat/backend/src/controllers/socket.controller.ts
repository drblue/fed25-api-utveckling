/**
 * Socket Controller
 */
import { ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types.ts";
import Debug from "debug";
import { Server, Socket } from "socket.io";
import { prisma } from "../lib/prisma.ts";
import { getUsersInRoom } from "../services/user.service.ts";

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
		socket.to(payload.roomId).emit("chatMessage", payload);
	});

	// Listen for a user join request
	socket.on("userJoinRequest", async (username, roomId, callback) => {
		debug("👶🏻 User %s from socket %s wants to join room %s", username, socket.id, roomId);

		// Get room from database
		const room = await prisma.room.findUnique({ where: { id: roomId } });

		// If room was not found, respond with success: false
		if (!room) {
			callback({ success: false, room: null });
			return;
		}

		// Don't allow busiga users
		if (username.toLowerCase().includes("bus-")) {
			callback({ success: false, room: null });
			return;
		}

		// Join room `roomId`
		socket.join(roomId);  // "69846c52e5bd692db4d14a0e"

		// 1. Create User, set id to socket.id and roomId to the roomId they want to join
		const user = await prisma.user.create({
			data: {
				id: socket.id,
				roomId,
				username,
			},
		});
		debug("👶 Created user: %o", user);

		// 2. Retrieve list of Users in the room
		const usersInRoom = await getUsersInRoom(roomId);
		debug("List of users in room '%s' (%s): %O", room.name, room.id, usersInRoom);

		// All is well, let the user in
		// Include information about the room
		callback({
			success: true,
			room: {
				...room,
				users: usersInRoom,  // 3. Respond with list of users in the room
			},
		});

		// Broadcast to everyone in the room (including ourselves) that a user has joined
		io.to(roomId).emit("userJoined", username, Date.now());

		// Broadcast a list of online users to the room (except ourselves)
		socket.to(roomId).emit("userList", usersInRoom);
	});

	// Handle user disconnecting
	socket.on("disconnect", async () => {
		debug("Socket disconnected: %s", socket.id);

		// Find user in order to know they exist (and also to know which room they were in for future use)
		const user = await prisma.user.findUnique({ where: { id: socket.id } });

		// If user didn't exist, do nothing
		if (!user) {
			return;  // 🤷 virtual shrug
		}

		// Delete user with `id: socket.id`
		await prisma.user.delete({ where: { id: socket.id } });
		debug("🧹 Deleted user: %o", user);

		// Retrieve list of Users in the room
		const usersInRoom = await getUsersInRoom(user.roomId);

		// Broadcast a notice to the room that the user has left
		io.to(user.roomId).emit("userLeft", user.username, Date.now());

		// Also broadcast a new list of users in the room
		io.to(user.roomId).emit("userList", usersInRoom);
	});
}

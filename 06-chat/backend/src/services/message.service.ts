/**
 * Message Service 📯💌📮📬
 */

import { ChatMessagePayload } from "@shared/types/SocketEvents.types.ts";
import { prisma } from "../lib/prisma.ts"

/**
 * Get the latest messages sent to a room
 *
 * @param roomId ID of room
 * @param maxAge Max age of messages to get (in seconds)
 * @param limit Max number of messages to get
 * @returns {Message[]} Messages
 */
export const getLatestMessagesByRoom = async (roomId: string, maxAge = 86400, limit = 100) => {
	const past = Date.now() - maxAge * 1000;  // Convert maxAge to milliseconds

	return await prisma.message.findMany({
		where: {
			roomId,
			timestamp: { gte: past },
		},
		orderBy: { timestamp: "asc" },
		take: -limit,
	});
}

/**
 * Create (save) a message
 *
 * @param data Message payload
 * @returns Message
 */
export const createMessage = async (data: ChatMessagePayload) => {
	return await prisma.message.create({
		data,
	});
}

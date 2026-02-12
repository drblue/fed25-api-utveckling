/**
 * Message Service 📯💌📮📬
 */

import { ChatMessagePayload } from "@shared/types/SocketEvents.types.ts";
import { prisma } from "../lib/prisma.ts"

export const getLatestMessagesByRoom = async (roomId: string) => {
	return await prisma.message.findMany({
		where: { roomId },
		orderBy: { timestamp: "asc" },
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

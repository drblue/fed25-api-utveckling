/**
 * Message Service 📯💌📮📬
 */

import { ChatMessagePayload } from "@shared/types/SocketEvents.types.ts";
import { prisma } from "../lib/prisma.ts"

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

/**
 * Room Service 🛎️🏨
 */

import { prisma } from "../lib/prisma.ts"

/**
 * Get all rooms
 *
 * @returns List of rooms
 */
export const getRooms = async () => {
	return await prisma.room.findMany({
		orderBy: { name: "asc" },
	});
}

/**
 * Get a single room
 *
 * @param roomId Room ID
 * @returns {Room} Room
 */
export const getRoom = async (roomId: string) => {
	return await prisma.room.findUnique({
		where: { id: roomId },
	});
}

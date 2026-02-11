/**
 * User Service 🛎️🏨
 */

import { prisma } from "../lib/prisma.ts"

/**
 * Get users currenly online in a room
 *
 * @param roomId ID of room
 * @returns List of users in room
 */
export const getUsersInRoom = async (roomId: string) => {
	return await prisma.user.findMany({ where: { roomId } });
}

/**
 * User Service 🛎️🏨
 */

import { User } from "@shared/types/Models.types.ts";
import { prisma } from "../lib/prisma.ts"

/**
 * Get users currenly online in a room
 *
 * @param roomId ID of room
 * @returns List of users in room
 */
export const getUsersInRoom = async (roomId: string) => {
	return await prisma.user.findMany({
		where: { roomId },
		orderBy: { username: "asc" },
	});
}

/**
 * Get a single user
 *
 * @param userId User ID (in our app it's the socket's id)
 * @returns {User} User
 */
export const getUser = async (userId: string) => {
	return await prisma.user.findUnique({ where: { id: userId } });
}

/**
 * Create a new user
 *
 * @param data User information
 * @returns {User} User
 */
export const createUser = async (data: User) => {
	return await prisma.user.create({
		data,
	});
}

/**
 * Delete a user
 *
 * @param userId ID of User to delete
 * @returns {User} User
 */
export const deleteUser = async (userId: string) => {
	return await prisma.user.delete({ where: { id: userId } });
}

/**
 * Delete all the users [DANGER!]
 *
 */
export const deleteAllUsers = async () => {
	return await prisma.user.deleteMany();
}

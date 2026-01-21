/**
 * User Service
 */
import { prisma } from "../lib/prisma.ts";
import { CreateUserData } from "../types/User.types.ts";

/**
 * Get a User by email
 *
 * @param email Email of user to get
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: { email },
	});
}

/**
 * Create a user
 *
 * @param data User data
 */
export const createUser = (data: CreateUserData) => {
	return prisma.user.create({
		data,
	});
}

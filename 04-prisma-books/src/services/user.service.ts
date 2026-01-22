/**
 * User Service
 */
import { prisma } from "../lib/prisma.ts";
import { BookId } from "../types/Book.types.ts";
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

/**
 * Get a user's books
 *
 * @param userId User Id
 */
export const getUserBooks = async (userId: number) => {
	const user = await prisma.user.findUniqueOrThrow({
		select: {  // every so slightly faster than getting BOTH the profile AND the books
			books: true,
		},
		where: { id: userId },
		// include: {
		// 	books: true,
		// },
	});

	return user.books;
}

/**
 * Add book(s) to user
 *
 * @param userId User ID
 * @param bookIdOrBookIds Book ID(s) to add
 */
export const addBooksToUser = async (userId: number, bookIdOrBookIds: BookId | BookId[]) => {
	const user = await prisma.user.update({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		data: {
			books: {
				connect: bookIdOrBookIds,
			},
		},
	});

	return user.books;
}

/**
 * Remove book from user
 *
 * @param userId User ID
 * @param bookId Book ID to remove
 */
export const removeBookFromUser = async (userId: number, bookId: number) => {
	const user = await prisma.user.update({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		data: {
			books: {
				disconnect: {
					id: bookId,
				},
			},
		},
	});

	return user.books;
}

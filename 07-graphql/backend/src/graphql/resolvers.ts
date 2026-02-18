// Resolvers define how to fetch the types defined in your schema.
import { Author, Book, Publisher } from "../../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";

const resolvers = {
	// Resolvers for the Query fields
	Query: {
		authors: () => {
			return prisma.author.findMany();
		},
		books: () => {
			return prisma.book.findMany();
		},
		publishers: () => {
			return prisma.publisher.findMany();
		},

		author: (_parent: unknown, args: { id: number }) => {
			return prisma.author.findUnique({
				where: { id: args.id },
			});
		},
		book: (_parent: unknown, args: { id: number }) => {
			return prisma.book.findUnique({
				where: { id: args.id },
			});
		},
		publisher: (_parent: unknown, args: { id: number }) => {
			return prisma.publisher.findUnique({
				where: { id: args.id },
			});
		},
	},

	// Resolvers for the Relation fields
	Author: {
		books: (parent: Author) => {
			return prisma.author.findUnique({
				where: { id: parent.id },
			})
			.books();
		},
	},
	Book: {
		authors: (parent: Book) => {
			return prisma.book.findUnique({
				where: { id: parent.id },
			})
			.authors();
		},
		publisher: (parent: Book) => {
			return prisma.book.findUnique({
				where: { id: parent.id },
			})
			.publisher();  // <-- Important, only return the Publisher relation
		},
	},
	Publisher: {
		books: (parent: Publisher) => {
			return prisma.publisher.findUnique({
				where: { id: parent.id },
			})
			.books();
		},
	},

	// Resolvers for the Mutation fields
	Mutation: {
		createAuthor: (_parent: unknown, args: { data: Omit<Author, "id"> }) => {
			return prisma.author.create({
				data: args.data,
			});
		},
	},
}

export default resolvers;

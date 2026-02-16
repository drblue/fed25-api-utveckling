// Resolvers define how to fetch the types defined in your schema.
import { Book } from "../../generated/prisma/client.ts";
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
	Book: {
		publisher: (parent: Book) => {
			return prisma.book.findUnique({
				where: { id: parent.id },
			})
			.publisher();  // <-- Important, only return the Publisher relation
		},
	},

	// Resolvers for the Mutation fields
	// Mutation: {
	// },
}

export default resolvers;

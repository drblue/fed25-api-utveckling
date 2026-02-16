// Resolvers define how to fetch the types defined in your schema.
import { prisma } from "../lib/prisma.ts";

const resolvers = {
	// Resolvers for the Query fields
	Query: {
		books: () => {
			return prisma.book.findMany();
		},
	},

	// Resolvers for the Relation fields
	// Book: {
	// },

	// Resolvers for the Mutation fields
	// Mutation: {
	// },
}

export default resolvers;

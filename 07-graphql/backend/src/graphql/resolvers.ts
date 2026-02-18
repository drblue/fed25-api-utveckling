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
		updateAuthor: (_parent: unknown, args: { id: number, data: Omit<Author, "id">}) => {
			return prisma.author.update({
				where: { id: args.id },
				data: args.data,
			});
		},
		deleteAuthor: (_parent: unknown, args: { id: number }) => {
			return prisma.author.delete({
				where: { id: args.id },
			});
		},

		createBook: (_parent: unknown, args: { data: Omit<Book, "id"> }) => {
			return prisma.book.create({
				data: args.data,
			});
		},
		updateBook: (_parent: unknown, args: { id: number, data: Omit<Book, "id"> }) => {
			return prisma.book.update({
				where: { id: args.id },
				data: args.data,
			});
		},
		deleteBook: (_parent: unknown, args: { id: number }) => {
			return prisma.book.delete({
				where: { id: args.id },
			});
		},

		createPublisher: (_parent: unknown, args: { data: Omit<Publisher, "id"> }) => {
			return prisma.publisher.create({
				data: args.data,
			});
		},
		updatePublisher: (_parent: unknown, args: { id: number, data: Omit<Publisher, "id"> }) => {
			return prisma.publisher.update({
				where: { id: args.id },
				data: args.data,
			});
		},
		deletePublisher: (_parent: unknown, args: { id: number }) => {
			return prisma.publisher.delete({
				where: { id: args.id },
			});
		},
	},
}

export default resolvers;

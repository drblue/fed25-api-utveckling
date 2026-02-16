import { prisma } from "../src/lib/prisma.ts";

const main = async () => {
	// 🌱 Here be all your seeds 🍼👶🏻...

	/**
	 * 👩‍💼 Publishers
	 */
	const hutchinson = await prisma.publisher.upsert({
		where: { id: 1 },
		update: {},
		create: { id: 1, name: "Hutchinson" },
	});

	const gnome = await prisma.publisher.upsert({
		where: { id: 2 },
		update: {},
		create: { name: "Gnome Press" },
	});

	const podium = await prisma.publisher.upsert({
		where: { id: 3 },
		update: {},
		create: { name: "Podium Audio" },
	});

	const modern_library = await prisma.publisher.upsert({
		where: { id: 4 },
		update: {},
		create: { name: "Modern Library" },
	});

	const del_rey = await prisma.publisher.upsert({
		where: { id: 5 },
		update: {},
		create: { name: "Del Rey" },
	});

	const allen_and_unwin = await prisma.publisher.upsert({
		where: { id: 6 },
		update: {},
		create: { name: "Allen & Unwin" },
	});

	/**
	 * ✍🏻 Authors
	 */
	const clarke = await prisma.author.upsert({
		where: { id: 1 },
		update: {},
		create: { id: 1, name: "Sir Arthur C. Clarke", birthyear: 1917 },
	});

	const asimov = await prisma.author.upsert({
		where: { id: 2 },
		update: {},
		create: { id: 2, name: "Isaac Asimov", birthyear: 1920 },
	});

	const anspach = await prisma.author.upsert({
		where: { id: 3 },
		update: {},
		create: { id: 3, name: "Jason Anspach" },
	});

	const cole = await prisma.author.upsert({
		where: { id: 4 },
		update: {},
		create: { id: 4, name: "Nick Cole" },
	});

	const tolkien = await prisma.author.upsert({
		where: { id: 5 },
		update: {},
		create: { id: 5, name: "J. R. R. Tolkien", birthyear: 1892 },
	});

	const austen = await prisma.author.upsert({
		where: { id: 6 },
		update: {},
		create: { id: 6, name: "Jane Austen", birthyear: 1775 },
	});

	const adams = await prisma.author.upsert({
		where: { id: 7 },
		update: {},
		create: { id: 7, name: "Douglas Adams", birthyear: 1952 },
	});

	/**
	 * 📚 Books
	 */
	await prisma.book.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			title: "2001: A Space Odessey",
			pages: 224,
			publisherId: hutchinson.id,
			authors: {
				connect: [ clarke ],
			},
		},
	});

	await prisma.book.upsert({
		where: { id: 2 },
		update: {},
		create: {
			id: 2,
			title: "2010: Odessey Two",
			pages: 291,
			publisherId: hutchinson.id,
			authors: {
				connect: [ clarke ],
			},
		},
	});

	await prisma.book.upsert({
		where: { id: 3 },
		update: {},
		create: {
			id: 3,
			title: "Foundation",
			pages: 542,
			publisherId: gnome.id,
			authors: {
				connect: [ asimov ],
			},
		},
	});

	await prisma.book.upsert({
		where: { id: 4 },
		update: {},
		create: {
			id: 4,
			title: "Galaxy's Edge: Book 1-2",
			pages: 0,
			publisherId: podium.id,
			authors: {
				connect: [ anspach, cole ],
			},
		},
	});

	await prisma.book.upsert({
		where: { id: 5 },
		update: {},
		create: {
			id: 5,
			title: "Pride and Prejudice",
			pages: 279,
			publisherId: modern_library.id,
			authors: {
				connect: [ austen ],
			},
		},
	});

	await prisma.book.upsert({
		where: { id: 6 },
		update: {},
		create: {
			id: 6,
			title: "The Hitchhiker's Guide to the Galaxy",
			pages: 216,
			publisherId: del_rey.id,
			authors: {
				connect: [ adams ],
			},
		},
	});

	await prisma.book.upsert({
		where: { id: 7 },
		update: {},
		create: {
			id: 7,
			title: "The Restaurant at the End of the Universe",
			pages: 250,
			publisherId: del_rey.id,
			authors: {
				connect: [ adams ],
			},
		},
	});

	await prisma.book.upsert({
		where: { id: 8 },
		update: {},
		create: {
			id: 8,
			title: "The Lord of the Rings",
			pages: 1216,
			publisherId: allen_and_unwin.id,
			authors: {
				connect: [ tolkien ],
			},
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});

import { prisma } from "../src/lib/prisma.ts";

const main = async () => {
	// 🌱 Here be all your seeds 🍼👶🏻...

	/**
	 * 👩‍💼 Publishers
	 */

	/**
	 * 📚 Books
	 */

	/**
	 * ✍🏻 Authors
	 */
	const astridLindgren = await prisma.author.upsert({
		where: { id: 1 },
		update: {},
		create: { id: 1, name: "Astrid Lindgren", /* books: { connect: { id: 3 } } */ },
	});

	const selmaLagerlof = await prisma.author.upsert({
		where: { id: 2 },
		update: {},
		create: { id: 2, name: "Selma Lagerlöf" },
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

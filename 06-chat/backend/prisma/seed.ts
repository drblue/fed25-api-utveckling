import { prisma } from "../src/lib/prisma.ts";

const main = async () => {
	// 🌱 Here be all your seeds 🍼👶🏻...

	/**
	 * Create all the neccessary rooms
	 */
	await prisma.room.upsert({
		where: { name: "General" },
		update: {},
		create: { name: "General" },
	});

	await prisma.room.upsert({
		where: { name: "Major" },
		update: {},
		create: { name: "Major" },
	});

	await prisma.room.upsert({
		where: { name: "Private" },
		update: {},
		create: { name: "Private" },
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

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const user1 = await prisma.user.upsert({
		where: { id: '099e46eb-041b-4112-8af8-977e2cb6e962' },
		update: {},
		create: {
			id: '099e46eb-041b-4112-8af8-977e2cb6e962',
			login: 'user 1 login',
			password: '1 password',
			version: 1,
		},
	});

	const user2 = await prisma.user.upsert({
		where: { id: 'd8676729-7367-4a8b-8866-bacebed47a0c' },
		update: {},
		create: {
			id: 'd8676729-7367-4a8b-8866-bacebed47a0c',
			login: 'user 2 login',
			password: '2 password',
			version: 2,
		},
	});

	console.log({ user1, user2 });
}

// execute the main function
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// close Prisma Client at the end
		await prisma.$disconnect();
	});

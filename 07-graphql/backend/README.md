# Prisma Books GraphQL Backend

This is a backend for a TypeScript Node.js GraphQL API using Prisma.

## Usage

Clone this repository, create an `.env` file and copy the contents from `.env.example`. Create a new MySQL-database and change the database variables in `.env`.

Install the packages:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Deploy the database migrations:

```bash
npx prisma migrate deploy
```

Seed the database:

```bash
npx prisma db seed
```

Start the server:

```bash
npm run dev
```

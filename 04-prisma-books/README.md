# Prisma Books

Express web server with Node, TypeScript and Prisma ORM.

## Installation

```bash
cp .env.example .env
```

Update `.env` with your database connection settings.

Install dependencies:

```bash
npm install
```

## Usage

### Development

```bash
npm run dev
```

## Making changes to the database schema

Edit `prisma/schema.prisma` as needed, then generate new Prisma Client types:

```bash
npx prisma generate
```

During prototyping, run `npx prisma db push` to push the schema to the database.

~~Once the API is deployed, **DO NOT EVER RUN** `npx prisma db push` - instead use
migrations (which we'll talk about next week)!~~~

Create an initial migration if you don't already have one:

```bash
npx prisma migrate dev --name "init"
```

This will delete all your current data and recreate the tables, so DO NOT RUN `npx prisma db push` from now on, otherwise the migrations will be out of sync and you'll get a migraine.

Create new migrations after each schema change:

```bash
npx prisma migrate dev --name "describe change here"
```

## Setup from scratch

```bash
npm init --init-type module -y
npm install express
npm install -D typescript tsx @types/node @types/express
```

### TypeScript Config

Create `tsconfig.json` with the following content:

```json
{
  "compilerOptions": {
    /* Basic settings */
    "target": "ES2023",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2023"],
    "skipLibCheck": true,

    /* Convenience (makes it feel like Vite/React) */
    "allowImportingTsExtensions": true, // Allows .ts in imports if desired
    "noEmit": true,                     // Let tsx or Node handle execution
    "isolatedModules": true,            // Required for fast transpilers like esbuild/tsx
    "allowJs": true,
    "checkJs": false,

    /* Strict code quality */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*", "prisma.config.ts"],
  "exclude": ["node_modules"]
}
```

### Add these scripts to `package.json`

Replace everything under `scripts` in `package.json`:

```json
  "scripts": {
    "typecheck": "tsc --noEmit",
    "dev": "tsx --watch src/server.ts",
    "start": "tsx src/server.ts"
  },
```

## Prisma

### Installation

```bash
npm install prisma @types/node --save-dev
npm install @prisma/client @prisma/adapter-mariadb dotenv
```

### Initialize Prisma ORM

```bash
npx prisma init --datasource-provider mysql --output ../generated/prisma
```

Don't forget to add `prisma.config.ts` to the `"include"`-array in `tsconfig.json`!

### Connect your database

Update your `.env` file to match the settings for your local MySQL (database) server.

### Introspect your database

```bash
npx prisma db pull
```

This will update `prisma/schema.prisma`.

### Generate Prisma ORM types

```bash
npx prisma generate
```

### Instantiate Prisma Client

N.B.! Don't forget to add the separate `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT` and `DATABASE_NAME` to your `.env` file (see example in `.env.example`). Do **NOT** delete the previous `DATABASE_URL` - it's still required.

Create `src/lib/prisma.ts` with content from <https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/mysql#7-instantiate-prisma-client>.

Change line 3 from

```ts
import { PrismaClient } from "../generated/prisma/client";
```

to

```ts
import { PrismaClient } from "../../generated/prisma/client.ts";
```

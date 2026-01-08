# Express web server med Node, TypeScript och Prisma ORM

## Installation

```bash
npm init --init-type module -y
npm install express
npm install -D typescript tsx @types/node @types/express
```

### TypeScript Config

Skapa `tsconfig.json` med följande innehåll:

```json
{
  "compilerOptions": {
    /* Grundläggande inställningar */
    "target": "ES2023",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2023"],
    "skipLibCheck": true,

    /* Bekvämlighet (gör att det känns som Vite/React) */
    "allowImportingTsExtensions": true, // Tillåter .ts i imports om man vill
    "noEmit": true,                     // Vi låter tsx eller Node sköta körningen
    "isolatedModules": true,            // Krävs för snabba transpilers som esbuild/tsx
    "allowJs": true,
    "checkJs": false,

    /* Strikt kodkvalitet */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Lägg till scripts i `package.json`

Ersätt allting under `scripts` i `package.json`:

```json
  "scripts": {
    "check": "tsc --noEmit",
    "dev": "tsx --watch src/index.ts",
    "start": "tsx src/index.ts"
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

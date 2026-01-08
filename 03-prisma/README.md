# Express web server med Node, TypeScript och Prisma ORM

## Installation

```bash
npm init --init-type module -y
npm install express
npm install -D typescript tsx @types/node @types/express
```

### Prisma installation

```bash
npm install prisma @types/node --save-dev
npm install @prisma/client @prisma/adapter-mariadb dotenv
```

#### Initialize Prisma ORM

```bash
npx prisma init --datasource-provider mysql --output ../generated/prisma
```

## TypeScript Config

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

## Lägg till scripts i `package.json`

Ersätt allting under `scripts` i `package.json`:

```json
  "scripts": {
    "check": "tsc --noEmit",
    "dev": "tsx --watch src/index.ts",
    "start": "tsx src/index.ts"
  },
```

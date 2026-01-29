# Changelog for Prisma Boilerplate Update

## Summary of Changes

- Updated `package.json` with new `main`, `start`, `build`, `type-coverage`, and added `pre-deploy` script.
- Replaced `eslint.config.ts` with a new configuration.
- Removed `scripts/build.sh` file.

## Update Instructions

### `package.json`

1. Update `main` to `"dist/server.js"`:

```json
  "main": "dist/server.js",
```

2. Update `start`-script to `"node src/server.js"`.

```json
    "start": "node dist/server.js"
```

3. Remove the following script:

```json
    "build-app": "npm run lint && npm run typecheck && node scripts/build.js",
```

4. Replace the `build` and `type-coverage` scripts with these updated versions:

```json
    "build": "npx prisma generate && node scripts/build.js",
```

```json
    "type-coverage": "type-coverage -p tsconfig.json --at-least 99 --detail --ignore-files \"generated/**/*.ts\" --ignore-files \"prisma/seed.ts\"",
```

5. Add the following `pre-deploy`-script:

```json
    "pre-deploy": "npx prisma migrate deploy && npx prisma db seed",
```

### `eslint.config.ts`

Replace `eslint.config.ts` in the root of your app with the following content:

```ts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["dist/**", "generated/**", "**/_*.ts"],
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		rules: {
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
		},
	},
	tseslint.configs.recommended,
]);
```

### `scripts/build.sh`

Delete the `scripts/build.sh` file from your project.

## Verifying the Update

1. Run checks to ensure everything is set up correctly:

```bash
npm run lint
npm run typecheck
npm run type-coverage
```

2. Build the project:

```bash
npm run build
```

3. Test the pre-deploy script:

```bash
npm run pre-deploy
```

4. Start the application:

```bash
npm start
```

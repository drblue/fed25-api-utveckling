# Real-time Chat 💬

## Frontend create

```sh
npm create vite@latest frontend -- --template vanilla-ts
cd frontend
npm install @fortawesome/fontawesome-free
npm install socket.io-client
npm install -D sass@1.77.6 --save-exact
npm install -D bootstrap
```

### Add linting

```sh
npm install -D eslint @eslint/js globals typescript-eslint jiti
```

### Add type-coverage

```sh
npm i -D type-coverage
```

### Add npm-run-all2

```sh
npm i -D npm-run-all2
```

### Add to `scripts` in `package.json`

```json
    "check": "run-s lint typecheck type-coverage",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "type-coverage": "type-coverage -p tsconfig.json --at-least 100 --detail",
```

Copy `frontend/eslint.config.ts` from this repo along with `index.html` and all files in `src/`.

## Backend

Based on <https://github.com/the-hive-resistance/fed25-api-prisma-boilerplate> but removed the following packages:

* bcrypt
* cookie-parser
* express-validator
* jsonwebtoken
* prisma

Also downgraded Prisma to version 6 to support `mongodb`.

### Remove packages

Run from the `backend` directory:

```sh
npm uninstall bcrypt cookie-parser express-validator jsonwebtoken @types/bcrypt @types/cookie-parser @types/jsonwebtoken
```

### Add packages

Run from the `backend` directory:

```sh
npm install socket.io supports-color
```

## Build and run

> [!IMPORTANT]
> These commands should be executed in the root directory.

Run `npm install` to install all packages for both frontend and backend, `npm run build` to build both frontend and backend, and then start the server using `npm start`. The frontend will be served as static files from the backend on the same port.

# Prisma Book Route Map 🚗🗺️

## Resources

### Authors

#### `GET /authors`

#### `GET /authors/:authorId`

#### `POST /authors`

#### `PATCH /authors/:authorId`

#### `DELETE /authors/:authorId`

### Books

#### `GET /books`

#### `GET /books/:bookId`

#### `POST /books`

#### `PATCH /books/:bookId`

#### `DELETE /books/:bookId`

#### `POST /books/:bookId/authors`

#### `DELETE /books/:bookId/authors/:authorId`

### Publishers

#### `GET /publishers`

#### `GET /publishers/:publisherId`

#### `POST /publishers`

#### `PATCH /publishers/:publisherId`

#### `DELETE /publishers/:publisherId`

## Authentication

### `POST /register`

Creates a new `User`.

## Profile

### `GET /profile`

Gets the authenticated `User`.

### `GET /profile/books`

Gets the authenticated `User`'s `Book`s.

# Mongoose syntax vs Prisma syntax

## Find many

```text
Movie.find() = prisma.movie.findMany()
```

## Find by ID

```text
Movie.findById() = prisma.movie.findUnique()
```

## Find one

```text
Movie.findOne() = prisma.movie.findFirst()
```

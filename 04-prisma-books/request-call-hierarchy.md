# Request Call Hierarchy

`GET /books/:bookId`

```text
server.ts
  -> app.ts
    -> express.json()
    -> morgan("dev")
    -> routes/root.router.ts
      GET /

      -> routes/authors.router.ts               /authors/*
        GET /                                   /authors/
          -> controllers/author.controller.ts@index

        GET /:authorId                          /authors/:authorId
          -> controllers/author.controller.ts@show

        POST /                                  /authors/
          -> controllers/author.controller.ts@store

        PATCH /authorId                         /authors/:authorId
          -> controllers/author.controller.ts@update

        DELETE /authorId                        /authors/:authorId
          -> controllers/author.controller.ts@destroy

      -> routes/books.router.ts                 /books/*
        GET /                                   /books/
          -> controllers/book.controller.ts@index

        GET /:bookId                            /books/:bookId
          -> controllers/book.controller.ts@show

        POST /                                  /books/
          -> controllers/book.controller.ts@store

        PATCH /bookId                           /books/:bookId
          -> controllers/book.controller.ts@update

        DELETE /bookId                          /books/:bookId
          -> controllers/book.controller.ts@destroy

      -> routes/publishers.router.ts            /publishers/*
        GET /                                   /publishers/
          -> controllers/publisher.controller.ts@index

        GET /:publisherId                       /publishers/:publisherId
          -> controllers/publisher.controller.ts@show

        POST /                                  /publishers/
          -> controllers/publisher.controller.ts@store

        PATCH /publisherId                      /publishers/:publisherId
          -> controllers/publisher.controller.ts@update

        DELETE /publisherId                     /publishers/:publisherId
          -> controllers/publisher.controller.ts@destroy

      /*
```

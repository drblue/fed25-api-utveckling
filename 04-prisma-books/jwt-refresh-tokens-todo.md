# JWT Refresh Tokens TODO

1. Issue (sign) a `refresh_token` as a cookie 🍪 when the user logs in.

`refresh_token` cookie content
```json
{
	"sub": "3",
	"exp": 13371337
}
```

2. Add `POST /refresh` endpoint that receives the cookie 🍪 and validates the `refresh_token` and issues (signs) a new `access_token`.

  1. Validate `refresh_token` and extract user id.
  2. Get the user from the database.
  3. Construct a new access_token payload and sign it.
  4. Respond with the new access_token.

`access_token` payload
```json
{
	"id": 3,
	"email": "sean@banan.se",
	"name": "Sean Banan",
  "iat": 13371338,
  "exp": 13381338
}
```

# Morgan formatters

## `morgan("combined")`

`::1 - - [29/Dec/2025:08:52:11 +0000] "GET /joke HTTP/1.1" 200 77 "-" "PostmanRuntime/7.51.0"`

## `morgan("common")`

`::1 - - [29/Dec/2025:08:53:00 +0000] "GET /joke HTTP/1.1" 200 95`

## `morgan("dev")`

`GET /joke 200 1.175 ms - 79`

## `morgan("short")`

`::1 - GET /joke HTTP/1.1 200 82 - 1.160 ms`

## `morgan("tiny")`

`GET /joke 200 62 - 0.513 ms`

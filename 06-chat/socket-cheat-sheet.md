# Socket.IO Cheat Sheet

## `io.emit`

Skickar till alla uppkopplade sockets, inklusive den som eventuellt precis kopplade upp sig.

## `io.to(roomId).emit`

Skickar till alla uppkopplade sockets i `roomId`, inklusive den som triggade eventet.

## `socket.broadcast.emit`

Skickar till alla **andra** uppkopplade sockets **förutom** `socket` (alltså den som orsakade/skickade eventet).

## `socket.to(roomId).emit`

Skickar till alla **andra** uppkopplade sockets i `roomId`, **förutom** den som triggade eventet.

## `socket.emit`

Skickar **enbart** till den orsakade/skickade eventet.

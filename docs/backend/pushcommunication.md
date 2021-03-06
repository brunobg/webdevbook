# Push communication

It's common these days to get notifications from the server for things like new messages or other events.

Websockets work by maintaining a two-way communication session between the server and the client. A socket is open at all times. This is very useful for data heavy applications that continuously need to receive data from the server and in real time, such as chats. It requires a websocket server in addition to the web server. You can transmit large amounts of data with websockets, and actually do all communication with the server through them instead of HTTP for your API calls.

## Websockets with Laravel

Websockets require a websocket server on the backend that keeps a socket open for each client. This is trivial to do in long running code such as NodeJS, but PHP is ran for each request and finishes. Laravel includes a [broadcasting API](https://laravel.com/docs/8.x/broadcasting) to help us with that. It can use third party services or [Laravel Websockets](https://github.com/beyondcode/laravel-websockets) as a server. You can also use other systems, such as Redis. A frontend library, Laravel Echo, makes the integration simple on both sides of the software.

TODO

## Notifications

TODO
https://laravel.com/docs/8.x/notifications

# Server side rendering

## No SPA

While this books advocates a SPA approach, this section give a quick overview of how you can render HTML entirely on the server.

## SPA and OpenGraph tags

Our SPA client is completely standalone, and does not require a dynamic server. It can be served from any static HTTP server. One disadvantage of this is that your meta tags on `<head>` are not dynamic either. This means that previews of your page from OpenGraph or similar tags are static -- most clients parse OpenGraph tags from the HTML, without running Javascript.

We can use Laravel to render the OpenGraph tags with a dynamic blade version of the client index.html built with the frontend.

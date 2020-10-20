# Routing

Routing consists of processing HTTP requests to web endpoints and calling the appropriate code to handle it. In other words, when someone accesses `/post/23`, the appropriate code for showing the user with id 23 must be called. Most web frameworks let you handle routes dynamically. You can also use routing for URL redirection.

Laravel has a [well structured routing mechanism](https://laravel.com/docs/routing). Your application has a `routes/` subdirectory, which has 4 files with self descriptive names: `api.php`, `channels.php`, `console.php` and `web.php`. Add the routing code to the appropriate file.

In a SPA, backend routing is quite limited. All non-API requests should serve static content: the basic static HTML, JS and CSS, or dynamic files like images uploaded by users; the [frontend will do its own routing](../frontend/routing.md) and render the correct HTML. The static data served might have only two points to consider:

- if you split your frontend code into separate and independent bundles, like a code for the main site and one of the admin dashboard, you'll have different static data for each one. Some of them might be protected by authentication and other middleware, but other than that it's just standard static files served by your web server or CDN.
- [header metadata](ssr.md). This is relevant to crawlers or social media, and it's addressed in its own section.

The API requests have to be handled by the backend. In a REST approach you'll need to write routes for each endpoint. It's best to define a base URL, like `/api/`, for all these requests. If you have a breaking change you can also version things, with `/apiv2` or `/api/v2` as the base URL.

A SPA Graphql application should have very few endpoints. All API requests go to `/graphql`, and if you are using Lighthouse, or a similar library, it will setup the endpoint for you, so it's unlikely you'll need to do anything else about that. You'll have the [authentication endpoints, which are explained in their own section](./authentication.md). You might have some other special endpoints, such as generating dynamic sitemaps on `/sitemap`. Other than these particular needs you'll mostly ignore routing except for a catch-all route, as detailed below.

In a traditional server-side rendering however, each page needs its own route. This makes routing much more important and relevant. We'll have a brief overview about it.

## Defining routes

Laravel has a [dedicated documentation to routing](https://laravel.com/docs/routing), so let's just skim over the important parts. This defines a route for the `/admin` endpoint with a `GET` request:

```php
Route::get('admin', function () {
    // your code goes here
});
```

Most often you'll want to invoke a controller, which can be done like this:

```php
Route::get('/user', 'UserController@index');
```

Routes may have parameters, which are defined be brackets, like `{id}` and passed as arguments to your callback. Optional arguments are marked with a `?`, like `{name?}`.

```php
Route::get('user/{id}', function ($id) {
    return 'User ' . $id;
});

Route::get('user/{name?}', function ($name = null) {
    return 'User name ' . $name;
});
```

Finally, you can just redirect URLs:

```php
Route::redirect('/here', '/there', 301);
```

## Middleware

There are several operations that are common to many endpoints. The most simple example is authentication: some endpoints should only be accessible to logged in users, or to administrators. Or you might want to throttle requests, to avoid password breaking attempts or to limit access to heavy resources. Middleware is a practical way to filter HTTP requests based on these specifications.

The idea of middleware is that you apply it to the route itself, ensuring that it's called before your endpoint code is called.

```php
Route::get('admin', function () {
    // your code goes here
})->middleware('mymiddleware');
```

You can easily define middleware for multiple routes:

```php
Route::middleware(['first', 'second'])->group(function () {
    Route::get('/', function () {
        // your code
    });

    Route::get('user/profile', function () {
        // your code
    });
});
```

Check [Laravel middleware documentation](https://laravel.com/docs/routing) for more information.

Two important middleware that are part of Laravel are `auth` and `throttle`. The first one ensures that the user is logged in; there's `auth:api` flavor too, to use a different authentication guard for API requests.

```php
Route::get('admin', function () {
    // your code goes here
})->middleware('auth');
```

The other one limits the number of requests for a user. To throttle an endpoint to a maximum of 60 times per minute:

```php
Route::middleware('auth:api', 'throttle:60,1')->group(function () {
    Route::get('/user', function () {
        //
    });
});
```

## SPA and catch-all

Even though you serve the same static content for any request in a SPA, you still need to provide unique URLs so people can easily reach the content they want. This can be achieved by a catch-all route. There are many ways to achieve that. One is to do really a catchall:

```php
Route::get('/{all}', function () {
    return view('layouts/app');
})
->where(['all' => '.*']);
```

You can be specific about the first subdirectory, restricting with a regex only the ones you have. Note that this must support the `/` URL too.

```php
Route::any('/{any}', function () {
    return view('index');
})
->where(['all' => '^(|post|user|group)/?.*']);
```

You can also be quite general and support any two level subdirectory, like this:

```php
Route::get('/{any?}/{any2?}', function () {
    return view('layouts/app');
});
```

The advantage of restricting to valid URLs is to return a 404 status code by the webserver, which is a good policy. Otherwise you only show a 404 error, known as a "soft 404". The disadvantage is that you have to be sure your regex matches all the valid URLs and only those. Ideally you should match all well constructed URLs by the router, and check if the dynamic pages exist (for example, does `/user/283482340` exist?) in the webserver.

## REST

If instead of GraphQL you are using REST, you'll and routing will soon become best friends.

Laravel helps by providing a [single call that includes CRUD+index endpoints](https://laravel.com/docs/controllers#resource-controllers):

```php
Route::resource('posts', PostController::class);
```

We talk a bit more about this on the [controllers chapter](./controllers.md).

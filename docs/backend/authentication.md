# Authentication

There are a few possibilities for authentication on the backend. Traditionally users send a unique username (which can be an email) and a password. This was checked in the server, which created a session and stored a cookie on the browser. With the development of the web much was changed, and it became relevant to authenticate on third-party services, which generated the OAuth protocol. Instead of using cookies it also became common to store tokens sent as part of the headers. The [frontend section](../frontend/authentication.md) goes into more detail.

Concerning the backend, we need to have an ability to authenticate users when we somehow get their information. We'll discuss two methods here; a purely local login and an OAuth flow, which can be local or remote.

If you plan to let third parties use your services on behalf of your users, you need OAuth. If you want just a simple login, it might be easier to use a less involved authentication system.

## Local authentication

We'll use [Laravel Sanctum](https://laravel.com/docs/7.x/sanctum) for local authentication. It is a simple implementation generate API tokens and SPA authentication.

### Setup

Setup in a nutshell:

```
composer require laravel/sanctum
```

Next, you should publish the Sanctum configuration and migration files using the vendor:publish Artisan command. The sanctum configuration file will be placed in your config directory:

```
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

Finally, you should run your database migrations. Sanctum will create one database table in which to store API tokens:

```
php artisan migrate
```

To use Sanctum to authenticate in SPA's, we can use Sanctum's middlewarm adding it to your app/Http/Kernel.php file:

```php
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

'api' => [
    EnsureFrontendRequestsAreStateful::class,
    'throttle:60,1',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

TODO, finish, Routing,

## OAuth

```shell
php artisan passport:install
```

Remember to [add these values to your .env files on the frontend](../frontend/authentication.md).

TODO, finish, Routing,

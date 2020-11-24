# Controllers

Controllers are the classes called by the routes when a request is made to your application. They are crucial parts of your application in with server-side rendering, since they are responsible for generating the entire HTML page.

::: tip
The use of Graphql with an automatic configuration loader such as [Lighthouse](https://lighthouse-php.com/) and authentication via OAuth makes writing controllers almost unnecessary. We'll briefly address how to implement them here for REST endpoints, as well as OAuth callbacks.
:::

Laravel has [support for controllers](https://laravel.com/docs/8.x/controllers). There are plenty of libraries that help with a traditional REST endpoint structure, cutting down the amount of controller code you have to write. One example is [InertiaJS](https://inertiajs.com/), which not only has plenty of support on the backend, but has adapters for frontend as well.

## What a controller looks like

Controllers are nothing but classes with public methods that are mapped to endpoints by routers. Here's a simple example for rendering a template on the show endpoint, which would be mapped to `/user/{id}`:

```php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
}
```

## REST endpoints

Most REST endpoints look the same. They all need CRUDL operations. Laravel provides [easy routing for these, which are called resource controllers](https://laravel.com/docs/8.x/controllers#resource-controllers), defining several endpoints like `/posts/create` and `/posts/{id}`:

```php
Route::resources([
    'posts' => PostController::class,
]);
```

You can scaffold the entire controller class easily:

```
php artisan make:controller PostController --resource --model=Post
```

With GraphQL you have just one endpoint, usually at `/graphql`.

REST is still a common protocol and a good solution for applications that perform non-trivial tasks on CRUDL or that don't use CRUDL. IoT devices often have actions like turning on, off, setting parameters etc, which map very well to GraphQL.

## Templates

Templates are fragments of (usually HTML) code that allow you to fill areas with variables. Templates can be powerful and include ifs and loops. Laravel [integrates Blade templates](https://laravel.com/docs/8.x/blade). They are extensively used for SSR, but not useful (at least on the backend) for SPAs.

Controllers call the template directly, passing variables to fill its data:

```php
    public function show($id)
    {
        return view('user.profile', ['user' => User::findOrFail($id)]);
    }
```

We won't get into Blade's syntax on this book.

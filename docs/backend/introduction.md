# Introduction

So you want to build the backend for a native and web application. This volume of the book is about how to to that. We'll talk how to quickly and safely setup everything, and delve into the specifics. We assume that you have some familiarity with PHP and know what a web framework is. Perhaps you used one. We'll use Laravel and setup a project from scratch.

## Setup the project

Let's use [composer](https://get-composer.org) to start our project.

```shell
composer create-project --prefer-dist laravel/laravel mybackend

cd mybackend

php artisan key:generate
```

This will create the scaffolding for your Laravel project; we're targetin Laravel 7.x in this book. Edit `.env` with your database settings. You can use several database backends and we'll talk about it later. To get started quickly you can setup a [SQLite](https://sqlite.org) database easily:

```
DB_CONNECTION=sqlite
DB_DATABASE=./database/database.sqlite
```

## Serving the frontend build

Laravel provides a command for running PHP's builtin HTTP server, so you don't have to install a full server like Apache or Nginx for development. Run:

```
php artisan serve --host 0.0.0.0 --port 8000
```

:::tip
Artisan is the command-line interface included with Laravel. It's useful for running commands that generate scaffolding or configure packages.
:::

And open http://localhost:8000. You'll see a basic template webpage.

:::tip
By using `--host 0.0.0.0` you can acess the HTTP server from other machines, which is useful for testing with other devices. Otherwise you can only access with localhost.
:::

Your application is up and running.

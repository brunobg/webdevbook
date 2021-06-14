# Database

## Database

There are many flavors of databases these days. Classic SQL running locally, NoSQL, many cloud solutions. As this is not a devops book, we'll not dive deeply into setup of database software, such as MariaDB, MySQL or PostgreSQL. Cloud solutions often have a SQL service, such as [AWS RDS](https://aws.amazon.com/rds/), [Digital Ocean Managed Databases](https://www.digitalocean.com/docs/databases/) and a multitude of other services. So you can use this book with your favorite cloud provider following its instructions for configuration.

:::tip
If you are using [Modelarium](https://github.com/Corollarium/modelarium), migrations, factory and seed files are automatically created for you.
:::

It's wise that the developer uses the same kind of database you are using in production, so install MySQL, PostgreSQL, SQL Server or your favorite flavor locally. It's essential for a CI server to use the same flavor and version, or you might miss a few bugs that will only be detected in production -- you might even use the same database server, at least while you're small. Note that although we showed how to use SQLite in the [introduction](./introduction.md), since it's trivial to setup and use, it is a more limited DB by definition. You probably don't want to use it in production for websites, unless it's a small project.

While you might need to use SQL queries directly in your code, we'll deal here with Eloquent, Laravel's ORM.

## How to plan a proper SQL schema

TODO

## Migrations

Migrations are the files that create or alter the database schema. They are responsible for creating tables for your [models](./models.md).

:::tip
If you are using Modelarium the migration files are created for you, and automatically reflect what is on the model declaration as well.
:::

Laravel reads migrations from the `database/migration` directory. Every time you need to change a database in production you add a new migration patch in a separate file -- this means that old migrations might not reflect the current schema, so don't just read them on systems that have patches, check the actual database schema. You can create a migration file with `artisan make:migration`.

## Relationships

We already explained [what relationships are in the models chapter](./models.md), so we'll go straight into how to create them in this chapter.

### One to one

One to one and one to many relationships are written the same way in the migration. The only difference is in the model.

### One to many

If we were doing everything manually first we'd declare source type migration, users (the `1` part of `1:n`). Notice that the database doesn't know about the other side of the relationship in this side:

```php
    Schema::create('users', function (Blueprint $table) {
        $table->bigIncrements("id");
        $table->string("name");
        $table->string("password");
        $table->string('email', 256)->unique();
        $table->rememberToken();
        $table->timestamps();
    });
```

It's on the target type that you declare the relationship:

```php
    Schema::create('post', function (Blueprint $table) {
        $table->bigIncrements("id");
        $table->string("title");
        $table->text('content');
        $table->unsignedBigInteger("user_id");
        $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
        $table->timestamps();
    });
```

### Many to many

To build a many to many relationship we need a third table. No changes to the user table:

```php
Schema::create('users', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->string('password');
    $table->string('email', 256)->unique();
    $table->rememberToken();
    $table->timestamps();
});
```

The other part of the relationship also does not have any foreign ids or keys:

```php
Schema::create('roles', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
    $table->timestamps();
});
```

The relationship is handled by the third table, also called a pivot table, which holds keys for both models at once:

```php
Schema::create('role_user', function (Blueprint $table) {
    $table->unsignedBigInteger('user_id');
    $table->unsignedBigInteger('role_id');
    $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
});
```

Notice that the table name, `role_user`, is composed of the singular names of both tables in alphabetical order, separated by an underscore. You can create a pivot table with `artisan make:migration:pivot`.

### Polymorphic one-to-one

Once again, the migrations for the one-to-one and one-to-many are the same. See below.

### Polymorphic many-to-one

Polymorphic relationships, require some special fields, to hold information about the target type, so it can be correctly instantiated. Imagine you have an image field that is 1:1:

```php
Schema::create('images', function (Blueprint $table) {
    $table->increments('id');
    $table->string('url');
    $table->unsignedBigInteger('imageable_id');
    $table->string('imageable_type');
    $table->index('imageable_id');
});
```

Note the `able_id` and `able_type` suffixes added to the new fields. You might want to add the index for faster access.

### Polymorphic many-to-many

This mixes all the techniques above. Let's add a tags table:

```php
Schema::create('tags', function (Blueprint $table) {
    $table->increments('id');
    $table->string('name');
});
```

It will have a many-to-many relationship with posts, comments, users. Here's the pivot table:

```php
Schema::create('taggables', function (Blueprint $table) {
    $table->unsignedBigInteger('tag_id')->references('id')->on('tags')->onDelete('cascade');
    $table->unsignedBigInteger('taggable_id');
    $table->string('taggable_type');
    $table->index('taggable_id');
});
```

An index was added to speed up access.

### Indices

Databases use indices (also known as keys) to speed up access to records. If you don't have an index, you have to sweep the entire table to match a value to a query. With indices this time is cut drastically, reducing the complexity to `O(1)` or `O(log(n))`.

Indices, like everything else in life, don't come free. They take extra storage (disk and memory) and extra time during insertion, delete and updating an entry. It's just not a good idea to add indices to all fields. There's much that influences when to create indices, but a basic set of guidelines is this:

- your id field should be a primary index. Laravel does that for you with `increments()`. It's hardly ever a good idea to use a primary index that is not a sequential integer -- the only other usual use case for this is using a unique hash, such as UUID, when it's hard to have a sequential index for some reason. If you think you need something else for a primary key: think twice.

- the database is the best place to ensure uniqueness. If you have a unique field, such as the email for users, use a unique index. Any constraints that you can add to the database are good, since you'll be sure they won't be violated even if there is a bug in your code.

- if you have a field that is constantly queried, consider adding an index to it. This is relevant for relationship id fields, for example: you'll constantly query the relationship and an index is almost certainly going to help and it faster.

- if you have fields that are queried together, add a multiple index: that is an index on all of them like `->index('field1', 'otherfield2')`.

- do not add indices to fields that have little variation of data. Adding an index to a `gender` or a `year` field won't help much.

- finally, there are some special index types that can help with particular queries and data types. For example, if you do a lot of word searches you want a full-text index. If you use spatial data you can benefit from a spatial index. Each database implements these slightly different (or doesn't at all), so you'll have to read its manual.

You want to keep as few indices as necessary. To make sure your index is being used and help, run an `EXPLAIN` query: this is a command databases have that detail how the query is being processed and what indices are used. Laravel has [Telescope](https://laravel.com/docs/telescope), a tool that logs queries and helps you see which ones are slow.

## Seeding

Seeding means creating fake entries in your database, so you can easily test the system.

:::tip
If you are using [Modelarium](https://github.com/Corollarium/modelarium) the seed files are created for you, and automatically reflect what is on the model declaration as well. You only have to add them to the `DatabaseSeeder`.
:::

Laravel has a simple seed system. The files are in `database/seeds` and you can create a seed file with `artisan make:seed`.

A seeder is simply a class that creates one or more entries in the database. The most basic example to seed users creates an entry directly on the database:

```php
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10) . '@email.com',
            'password' => Hash::make('password'),
        ]);
    }
}
```

This is not a good idea, though. It goes over the model and might easily get out of synchrony when new fields are added. A better way to do it is to use a factory (which we'll see below):

```php
class UserSeeder extends Seeder
{
    public function run()
    {
        $model = factory(App\Models\User::class)->create();
    }
}
```

Creating good fake data is not as easy as it seems. There's a great package for it in PHP, [Faker](https://github.com/fzaninotto/Faker). You should use it as much as you can. Seeding relationships can be very tricky. You need to create objects in the right order and properly fill the data, which compounds the problem. Here's how you can use a seeder to create 50 users, each of them with a post:

```php
class UserSeeder extends Seeder
{
    public function run()
    {
        factory(App\Models\User::class, 50)->create()->each(function ($user) {
            $user->posts()->save(factory(App\Models\Post::class)->make());
        });
    }
}
```

Finally, remember to edit the `DatabaseSeeder` class to call all your seeders and in the correct order. It will look like this:

```php
public function run()
{
    $this->call([
        UserSeeder::class,
        PostSeeder::class,
        CommentSeeder::class,
        // etc
    ]);
}
```

It's best if can use a tool to generate your seeders.

To actually run the seeders, use artisan. You can run them all or just one of them:

```
php artisan db:seed

php artisan db:seed --class=UserSeeder
```

## Factories

Factories are incredibly useful for unit testing and for seeders. They work by filling the fields of your model with proper random data, which then can be saved to the database or manipulated.

:::tip
If you are using [Modelarium](https://github.com/Corollarium/modelarium) the factory files are created for you, and automatically reflect what is on the model declaration as well. You don't have to do anything!
:::

So, here's how you can generate data, using `Faker`, with a factory:

```php
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => Hash::make('password')
        'remember_token' => Str::random(10),
    ];
});
```

Laravel 8.x changed the old format and now uses classes, so it changes the code slightly:

```php
class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }
}
```

You can create a factory file with artisan:

```
php artisan make:factory PostFactory
```

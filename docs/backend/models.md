# Models

Each "thing" in your application will be a model. Examples: users, posts, comments, products. A model describes this thing in an object, with its data fields and auxiliary methods. It's usually through models that you interact with the database, create new items, delete or update items.

## Designing models and relationships

There's a bit of an art in how to design your database and application, and we [talked a bit about what questions you should ask yourself](./architecture.md). Particularly if you are using a relational database -- which we are here -- you want to take proper care of relationships between models. Relational databases don't have arrays as a native type, so if you have any field that is an array it's likely that you'll model it as a relationship.

When you are at the drawing board, make a list of all the types you expect in your application. Then specify which fields they have. If a field is array, split it into a separate model; for example, if a user can have multiple addresses, you'll want a `User` and an `Address` models, while if they're only going to have one the address fields can be part of `User`. Relationships are these "links" between your models. Relationships are described by their cardinality, that is, how many of one type are expected to be connected to other types.

Let's see about this. We'll briefly go over the different relationship types and how they're modeled in Laravel, and then move on to GraphQL.

:::tip
If you are using Modelarium all the PHP code for relationships described in this section will be generated automatically for you.
:::

In Laravel we must declare relationships on the models, so it knows what types to expect and what cardinality. Laravel has an [ORM called Eloquent](https://laravel.com/docs/eloquent), which is a layer to access the database without writing SQL manually. Laravel also has [good documentation on relationships[(https://laravel.com/docs/eloquent-relationships), which this file mostly skims over. You'll also have to [create your data on the database, which we'll talk about later](./database.md).

### One to one relationships

If you expect a type to have a single relationship to another type, and vice-versa, that's a 1:1 relationship. A good example is with spouses: in most places if you are married, you have just one spouse and vice-versa. 1:1 relationships are usually uncommon. It's often simpler to put the data into a single table: for example, addresses. But sometimes it's wise to split into separate tables to make tables smaller, which can be more efficient. We'll [describe the database code later](./database.md#one-to-one).

Let's suppose our users can have only one pass, which is unique.

```php
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    public function pass(): HasOne
    {
        return $this->hasOne(\App\Models\Pass::class);
    }
}
```

Now we also define the inverse relationship:

```php
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pass extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
```

Note that we are declaring the return types in both cases, which is not always done in the Laravel examples you see around. This is relevant for reflection operations that are used by LighthousePHP and Modelarium, and it's a good practice as well.

### One to many relationships

This is a common case. One model has a single relationship to another, but the other can be related to many of the original type. This is the case of Book and Publisher: each book has only one publisher, but each publisher can publish many books. Other examples: Post<->Comment, User<->Post. We'll [describe the database code later](./database.md#one-to-many).

Here's how to write this model relationship. Note that we now use `HasMany`, and that `posts` is plural.

```php
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    public function posts(): HasMany
    {
        return $this->hasMany(\App\Models\Post::class);
    }
}
```

Now we also define the inverse relationship:

```php
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    /**
     * Get the spouse record associated with the user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(App\Models\User::class);
    }
}
```

The nice thing about relationships using an ORM like Eloquent is that we can easily probe them:

```php
$posts = User::find(1)->posts;

foreach ($posts as $post) {
    // do something
}
```

Or through the inverse:

```php
$post = Post::find(1);
$username = $post->user->name;
```

### Many to many relationships

Sometimes, however, both sides of relationship might have a multiple cardinality. For example, an `User` might be in several `Project`, and each `Project` will also have multiple `User`. SQL relationships don't allow arrays, so we'll need a third table to link both, known as a link table or associate table. The models will point to this intermediary table. We'll [describe the database code later](./database.md#many-to-many).

```php
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Model
{
    public function projects(): HasMany
    {
        return $this->hasMany(\App\Models\Project::class);
    }
}
```

Now we also define the inverse relationship:

```php
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    /**
     * Get the spouse record associated with the user.
     */
    public function users(): BelongsTo
    {
        return $this->belongsToMany(App\Models\User::class);
    }
}
```

### Polymorphic relationships

Sometimes a model type will need to have a relationship to several other types, not just one. For example, you might have a `Comment` model, and these comments might be related for `Post` or `Project`. Or you can have media, and the `Media` type should allow relationships to `User` and `Place`. These are polymorphic relationships.

### Polymorphic one-to-one

We can imagine a system that each image is associated with only one post or user, and each post or user can only have one image. This is very similar to a monomorphic relationship. The difference is in the return types and in how we must declare the relationship with its field name. In this case `imageable` describes the table row name: there will be `imageable_id` and `imageable_type` rows in the `images` table to describe the relationship, as detailed in the [database section](./database.md#polymorphic-one-to-one).

```php
class Image extends Model
{
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }
}

class Post extends Model
{
    public function image(): MorphOne
    {
        return $this->morphOne(App\Models\Image::class, 'imageable');
    }
}

class User extends Model
{
    /**
     * Get the user's image.
     */
    public function image(): MorphOne
    {
        return $this->morphOne(App\Models\Image::class, 'imageable');
    }
}
```

### Polymorphic many-to-one

### Polymorphic many-to-many

## Models (types) in Graphql

Graphql files will have a declaration for each model:

```graphql
type Something {
  id: ID!
  title: String!
}
```

The `!` marks that field as required. Note that Graphql allows arrays of basic types:

```graphql
type Something {
  id: ID!
  title: [String!]!
}
```

`[String!]!` means "a required list of non-null strings". Take care when declaring arrays of basic types, since you'll have to so some sort of manipulation to get the data from a relational database.

### Relationships in GraphQL

So let's start with a basic 1:n relationship. We have users and they can make posts. Each user can make as many posts as they way, but each post is made by just one author. Here's how we can describe it in GraphQL:

```graphql
type User {
  id: ID!
  name: String!
  email: Email!
  posts: [Post!] @hasMany
}

type Post {
  id: ID!
  title: String!
  content: Text!
  user: User!
    @belongsTo
    @migrationForeign(onDelete: "cascade", onUpdate: "cascade")
}
```

When users are created they never made a post yet, so we don't make the field required. But posts are created by a user. Note that we declared posts as an array: `posts: [Post!]`. But they are a relationship, and we declare that with `@hasMany` and `@belongsTo` directives. These directives are processed by Lighthouse and GraphQL, together with `@migrationForeign` to specify a foreign key.

If we were doing everything manually first we'd declare their migration, users:

```php
    Schema::create('users', function (Blueprint $table) {
        $table->bigIncrements("id");
        $table->string("name");
        $table->string("password");
        $table->string('email', 256);
        $table->timestamps();
    });
```

and posts:

```php
    Schema::create('posts', function (Blueprint $table) {
        $table->bigIncrements("id");
        $table->string("title");
        $table->text('content');
        $table->unsignedBigInteger("user_id");
        $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");
        $table->timestamps();
    });
```

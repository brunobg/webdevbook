# Models

Each "thing" in your application will be a model. Examples: users, posts, comments, products. A model describes this thing in an object, with its data fields and auxiliary methods. It's usually through models that you interact with the database, create new items, delete or update items.

There's a bit of an art in how to design your database and application, and we [talked a bit about what questions you should ask yourself](./architecture.md). Particularly if you are using a relational database -- which we are here -- you want to take proper care of relationships between models. Relational databases don't have arrays as a native type, so if you have any field that is an array it's likely that you'll model it as a relationship.

When you are at the drawing board, make a list of all the types you expect in your application. Then specify which fields they have. If a field is array, split it into a separate model; for example, if a user can have multiple addresses, you'll want a `User` and an `Address` models, while if they're only going to have one the address fields can be part of `User`. Relationships are these "links" between your models. Relationships are described by their cardinality, that is, how many of one type are expected to be connected to other types, such as one-to-one or one-to-many. We'll describe cardinalities below.

Let's see about this. We'll briefly go over the different relationship types and how they're modeled in GraphQL, and then explain how to implement in Laravel.

:::tip
If you are using Modelarium all the PHP code for relationships described in this section will be generated automatically for you from the GraphQL code.
:::

In Laravel we must declare relationships on the models, so it knows what types to expect and what cardinality. Laravel has an [ORM called Eloquent](https://laravel.com/docs/eloquent), which is a layer to access the database without writing SQL manually. Laravel also has [good documentation on relationships](https://laravel.com/docs/eloquent-relationships), which this file mostly skims over. You'll also have to [create your data on the database, which we'll talk about later](./database.md).

## Models (types) in Graphql

Graphql files will have a declaration for each model, declared as a `type`.

```graphql
type Something {
  id: ID!
  title: String!
  # other fields...
}
```

The `!` marks that field as required. Note that Graphql allows arrays of basic types, unlike SQL (but which is common in NoSQL):

```graphql
type Something {
  id: ID!
  title: [String!]!
  # other fields...
}
```

`[String!]!` means "a required list of non-null strings".

Some attention may be required for arrays. LighthousePHP and Modelarium handle arrays for relationships, automatically generating the correct one-to-many or many-to-many code for you. You need to take more care when declaring arrays of basic types, since you'll have to so some sort of manipulation on the data coming from a relational database.

## Designing models

Models should be independent, self-contained sets of information that are useful. Very large models are complicated to deal with, error-prone and easier to break. Databases may also not handle tables with a very large number of columns as well as smaller ones. In general entries are stored contiguously and it's faster to read smaller entries, but this has changed a bit with move to SSD and newer DB engines. Nevertheless it's still a good rule of thumb both in regards to organization and performance.

Try to be as specific in your fields as possible. If you are using only integers, don't declare the type as a string. Databases are limited in their type system, and PHP (as well as JS, and even Python; interpreted languages usually are weakly typed) can also handle data automatically converting it when necessary. Input should never be trusted, and your code will also have bugs. If you design your models so that fields are validated you'll avoid a number of bugs and security problems. Ideally you should use a strong(er) type system. Even if not supported as primitives in your language, you can use libraries that ensure that data matches a type.

There's a powerful difference between checking data and checking types. If you check data you only guarantee that field in that particular point to match your validation rules; if you use types you have a unique code that does validation for all fields of that type, and which might be called by different parts of your code.

At the same time, don't add constraints to your fields if you don't have a good reason for them. Don't force fields to have a minimum size unless that makes sense, or a short maximum size. Remember people use all kinds of languages and that Unicode is absolutely required these days.

Designing data structures is a hard problem. Even something as simple as [a physical address is very hard](https://www.mjt.me.uk/posts/falsehoods-programmers-believe-about-addresses/), and programmers often [have beliefs that are false](https://github.com/kdeldycke/awesome-falsehood). You can and should follow standards whenever they exist. [Schema.org](https://schema.org/) is far from perfect, but it's a decent vocabulary that is used by several search engines and W3, therefore also having the benefit of SEO. Don't reinvent the wheel.

## Relationships

Different models will have relationships between them. These means links or pointers between the models, such as a `User` has an `Address`. SQL uses primary keys for these relationships, which is mostly abstracted with ORMs. GraphQL uses primary ids as well.

Modelarium and Lighthouse implement `@hasOne`, `@hasMany`, `@belongsTo`, `@belongsToMany` and so on, making it easy to declare all relationships from the GraphQL description alone and have their code generated for you, but we also show the counterpart PHP code.

### One to one relationships

If you expect a type to have a single relationship to another type, and vice-versa, that's a 1:1 relationship. A good example is with spouses: in most places if you are married, you have just one spouse and vice-versa. 1:1 relationships are usually uncommon in databases. It's often simpler to put the data into a single table: for example, addresses (if you allow a single address per user). But sometimes it's wise to split into separate tables to make tables smaller, which can be more efficient, or simpler to deal with and with simpler model classes. We'll [describe the database code later](./database.md#one-to-one).

Let's suppose our users can have only one ticket pass, which is unique.

```graphql
type User {
  id: ID!
  email: Email!
  pass: Pass @hasOne
}

type Pass {
  id: ID!
  code: String!
  user: User!
    @belongsTo
    @migrationForeign(onDelete: "cascade", onUpdate: "cascade")
}
```

Note that we don't declare `pass: Pass!`, but `pass: Pass`. This is because we'll have to create one of the entries first, and we want to avoid a circular "User needs Pass" and "Pass needs User" dependency.

In PHP, you need to declare these relationships in the models:

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

So let's start with a basic 1:n relationship. We have users and they can make posts. Each user can make as many posts as they way, but each post is made by just one author. Here's how we can describe it in GraphQL:

```graphql
type User {
  id: ID!
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

When users are created they never made a post yet, so we don't make the field required. But posts are always created by a user. Note that we declared posts as an array: `posts: [Post!]`. But they are a relationship, and we declare that with `@hasMany` and `@belongsTo` directives. These directives are processed by Lighthouse and GraphQL, together with `@migrationForeign` to specify a foreign key.

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

It's easy to declare a many-to-many relationship in GraphQL:

```graphql
type User {
  id: ID!
  email: Email!
  projects: [Project!] @hasMany
}

type Project {
  id: ID!
  title: String!
  users: [User!] @belongsToMany
}
```

The PHP code for the model is not that complicated either.

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

TODO: Graphql

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

TODO

### Polymorphic many-to-many

TODO

## Queries

TODO

# Models

Each "thing" in your application will be a model. Examples: users, posts, comments, products.

## How to model your application

There's a bit of an art in how to model your database and application, and we [talked a bit about what questions you should ask yourself](./architecture.md). Particularly if you are using a relational database, you want to take care of relationships between models. Relational databases don't have arrays as a native type, so if you have any field that is an array it's likely that you'll model it as a relationship.

When you are at the drawing board, make a list of all the types you expect in your application. Then specify which fields they have. If a field is array, split it into a separate model; for example, if a user can have multiple addresses, you'll want a `User` and an `Address` models, while if they're only going to have one the address fields can be part of `User`.

## Describing types in Graphql

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

## Relationships

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

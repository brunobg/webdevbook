# Architecture and scaffolding

We will talk about the Laravel application code structure and backend planning in this book, but we can also save a few thousand keystrokes by using a scaffold generator from GraphQL models. Let's understand what is GraphQL and how to architect it all.

TODO
Database
Models
Controllers
Policies
Events
Routes

## GraphQL

TODO
What is GraphQL?
How to describe models?

## Scaffolding

There's a lot of structure in a regular web application to implement all the items above. So we'll use the GraphQL Schema Definition Language (SDL) to describe your data and add functionality through server-side directives. We'll use [Modelarium](https://github.com/Corollarium/modelarium) and [Lighthouse](https://lighthouse-php.com) to get rid of most of the scaffolding and focus on the code itself.

**Lighthouse** is a framework for serving GraphQL from Laravel.

**Modelarium** is a framework for generating code scaffolding from GraphQL SDL, creating all the files you need to focus on the logic itself. It generates Laravel code structure as well as frontend components with its companion **Formularium**.

We'll use both extensively in this book, describing operations from the user's point of view, which is what GraphQL describes. We'll also explain what the tools are doing and generating.

So let's add these deps to our project:

```
composer require corollarium/modelarium corollarium/formularium nuwave/lighthouse
```

## Designing your application

This is arguably the most important part of your application, and certainly the one that requires most thought in its design.

### What types do you have in your system?

The first question you have to ask yourself is what types your system will have.

You almost certainly will have `Users`. What do they do? If it's a communication system for example, they might create `Posts` and add `Comments` to the posts, and probably giving `Ratings`.

Or you are building an ecommerce store. Perhaps it has `Users` to save their information, but you might be selling without even creating a `User` entry and storing it all on the invoice. But you have `Products`, which might have `Reviews`, and the `Invoices` for purchases. But invoices are a complex type, with several rows of different data. So you might want an `InvoiceItem` type with the product purchasen, the amount and price, and who bought it.

### What are the relationships?

Remember, SQL databases do not have arrays as a primary datatype, so whenever you have an array it's probably better to store it as a relationship with another type -- like the `InvoiceItem` example. The relationships can be one-to-one, one-to-many or many-to-many. It may be a good idea to draw an ER diagram with your modeling.

### What queries to do need?

It's likely that you'll want to list the entries of a certain type, and fetch information about a specific entry. What about other queries? Perhaps searching products by name, or listing all posts with a specific tag.

### What mutations are possible on each type?

You need to be able to create a type instance, such as a new `Post` or new `Product`. Do you want to delete them though? You might want to keep them forever. What about editing? Can you change that instance after it's created? The basic operations on a type (CRUD, for Create, Read, Update, Delete) are not necessarily implemented for all types. You might not even want to expose a create operation if you have a limited, fix set of instances that are generated during the setup of your application -- for example, t-shirt sizes.

With GraphQL all the operations that generate changes to the database are called _mutations_. We're going to list all mutations and organize them with the model type definition to make them easier to find. Sometimes creating can be a mutation in another type: for example, creating a comment can be a `commentPost` mutation. Adding new pictures can be a `postPhoto` mutation.

List the operations that you'll use.

### Who can do those operations?

Not every operation can be done by every user. You don't want John changing Mary's profile, or Paul accessing Jane's invoices. So both queries and mutations need to be restricted with policies. For each item in your query and mutation list describe the restrictions. Do it from the start; it's better to have all endpoints blocked by default than to forget one of them.

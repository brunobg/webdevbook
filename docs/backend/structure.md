# Code structure

We will talk about the Laravel application code structure and backend planning in this book, but we can also save a few thousand keystrokes by using a scaffold generator from GraphQL models.

## Backend structure overview

You start with your database. You will have code create the tables and patch the database when the application needs changes. These are often called **migrations**. Laravel adopts a standard that you never overwrite existing migration files, you create a new one that patches the database. The advantage is that you can easily upgrade existing installations, but sometimes it can be tricky to understand what the database actually is when you have many migrations changing the original layout.

To test an application you need to create some data, or **seed** it. You also have **database factories** in Laravel, which define how to generate random data for the seeding. Laravel stores all this in the `database` folder, with subfolders for seeds, migrations and factories.

Each type in your database will have one (or more) tables, and it will be mapped to code onto a **model**. Model classes store data when you are processing it, and are how you create or update entries.

Moving on, web applications define **routes**. This explains to the server how to map a HTTP request it received a certain URL onto actual code to run. In Laravel routes are in the `routes` directory. You also can define middleware in your routes; that is, code that changes its behavior. For example, you can define that some routes require the user to be authenticated.

Each route maps a URL to a method in a **controller**. Controllers are classes that translate the HTTP request into what to run.

Every time you get a request, you need to **validate** it, because you are not sure if the user is not trying to do something malicious. While we'll talk about validation in depth later, it's important to make it as automatic as possible. Many security holes come from improperly validated data. One can validate data on the controller or on the model. Doing it on the model is safer -- you are sure that data is checked whenever the model is changed, and you don't have to add new checks each time you write a new controller endpoint, which is particularly annoying with REST endpoints. With Graphql the endpoint can be entirely controlled by a library that ensures that validation is properly applied. Even so, you might call the models directly -- for example, when seeding or when importing data from a script. If your data is validated on the model you are always sure that it's correct.

Not every user will be allowed to do every action in your system. That why we have **policies**, to grant access to actions based on the user who made the request and the model data. For example, only the original poster may change a post, but anybody can comment on it.

Things are happening on the application as a whole and sometimes you want to perform certain actions when certain things happen. For example, you want to send a welcome email when a user registers, or send them a notification when there's a new message for them. That's when you use **events** and **listeners**.

## How we'll save hours of scaffolding

As you can see, there's a lot of structure in a regular web application to implement all the items above.

While you can create all this by hand (and Laravel helps you with Artisan commands that create classes for you), in this book we'll use the GraphQL Schema Definition Language (SDL) to describe your data and add functionality through server-side directives. We'll use [Modelarium](https://github.com/Corollarium/modelarium) and [Lighthouse](https://lighthouse-php.com) to get rid of most of the scaffolding and focus on the code itself.

**Lighthouse** is a framework for serving GraphQL from Laravel.

**Modelarium** is a framework for generating code scaffolding from GraphQL SDL, creating all the files you need to focus on the logic itself. It generates Laravel code structure as well as frontend components with its companion [Formularium](https://github.com/Corollarium/Formularium).

We'll use both extensively in this book, but most of the time you won't notice they're there. We'll explain what the tools are doing and generating, but we'll save a lot of typing by using them.

So let's add these deps to our project:

```
composer require corollarium/modelarium corollarium/formularium nuwave/lighthouse
```

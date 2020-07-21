# Code structure

We will talk about the Laravel application code structure and backend planning in this book, but we can also save a few thousand keystrokes by using a scaffold generator from GraphQL models.

## Backend structure

TODO
Database
Models
Controllers
Policies
Events
Routes

## Scaffolding

There's a lot of structure in a regular web application to implement all the items above. So we'll use the GraphQL Schema Definition Language (SDL) to describe your data and add functionality through server-side directives. We'll use [Modelarium](https://github.com/Corollarium/modelarium) and [Lighthouse](https://lighthouse-php.com) to get rid of most of the scaffolding and focus on the code itself.

**Lighthouse** is a framework for serving GraphQL from Laravel.

**Modelarium** is a framework for generating code scaffolding from GraphQL SDL, creating all the files you need to focus on the logic itself. It generates Laravel code structure as well as frontend components with its companion **Formularium**.

We'll use both extensively in this book, describing operations from the user's point of view, which is what GraphQL describes. We'll also explain what the tools are doing and generating.

So let's add these deps to our project:

```
composer require corollarium/modelarium corollarium/formularium nuwave/lighthouse
```

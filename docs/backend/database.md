# Database

## Database

There are many flavors of databases these days. Classic SQL running locally, NoSQL, many cloud solutions. Laravel comes from the classic history of SQL servers, and we'll stay away from NoSQL.

As this is not a devops book, we'll not dive deeply into setup of database software, such as MariaDB, MySQL or PostgreSQL. Cloud solutions often work with SQL, such as [AWS RDS](https://aws.amazon.com/rds/), [Digital Ocean Managed Databases](https://www.digitalocean.com/docs/databases/) and a multitude of other services. So you can use this book with your favorite cloud provider following its instructions for configuration.

:::tip
If you are using Modelarium migrations, factory and seed files are automatically created for you.
:::

For development it's wise to use the same kind of database you are using in production, so install MySQL, PostgreSQL, SQL Server or your favorite flavor locally. Although we showed how to use SQLite in the [introduction](./introduction.md) it is a more limited DB by definition. You probably don't want to use it in production (at least for larger sites).

## Migrations

Migrations are the files that create or alter the database schema. They are responsible for creating tables for your [models](./models.md).

:::tip
If you are using Modelarium the migration files are created for you, and automatically reflect what is on the model declaration as well.
:::

## Relationships

### One to one

### Many to one

### Many to many

### Polymorphic one-to-one

### Polymorphic many-to-one

### Polymorphic many-to-many

## Seeding

:::tip
If you are using Modelarium the seed files are created for you, and automatically reflect what is on the model declaration as well.
:::

## Factories

:::tip
If you are using Modelarium the factory files are created for you, and automatically reflect what is on the model declaration as well.
:::

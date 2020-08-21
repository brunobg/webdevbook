# Architecture

There are several considerations when you start an application. This section will details some basic choices you have to make.

## Server-side render versus SPAs

Originally the web worked in a simple way: the server sent HTML ready for the browser to render and show. There was no dynamic data transference between the browser and the server; everything was a HTML page. With Javascript appearing and XHR (ajax), it became possible to fetch data without navigating to a new page. Eventually some people started to implement the entire generation of HTML on the client, and the server only sent pure data in JSON or XML formats. So Single Page Applications were born.

The advantage of SPAs is to keep the entire frontend generation on the client, which becomes easier with reactive JS frameworks such as Vue or React. This way all the communication with the server is either serving static assets (JS, images, or the very basic HTML page that is used as base for loading) or serving data from the DB. It becomes possible to move all static assets to a CDN, and clients only have to load them once, making navigation faster. It also makes the backend easier to write, because you don't have to worry about HTML or rendering at all. You just write endpoints to get data. The servers need to do much less processing, therefore their load is also much lighter.

SPAs have a much longer loading phase, however. Clients need to download the base HTML, then the JS for rendering (which can be megabytes), and only when the JS is finished downloading it runs, setups what is needs and requests the actual dynamic data from the server. The data is downloaded and the JS processes it to generate HTML, which the browser renders. As a result, it's one or two orders of magnitude slower on the client than server-side rendering. If you don't take care you end up with a site that takes several seconds to load, which is not a good user experience.

SPAs are attractive for another reason: there's a separation of frontend and backend into different code bases, which become completely independent. This makes it easier for teams to work on the same project and reduces the possibility of breakage, as long as you take care that the data transference follows the expected format.

We are taking a SPA approach in this book. In our case we are also developing a mobile app, so it makes sense that the backend will be only one, serving the same data for web and mobile. It also makes it easier to write code for the frontend, since you only have to write the communication code once.

That doesn't mean that server-side rendering is dead. In fact we'll see that if we want to provide page previews with metadata, we'll have to some at least some server-side rendering. Most automated tools will download the HTML and not run the JS, so they only see what the server outputs. Indexers such as Google run JS these days so they can index your site properly, but most crawlers, as well as preview fetchers from chat apps for example, don't.

In sites that are not very interactive, SPAs might make them slower with little gain. If you have static data you can pre-render the HTML on the server. There are ways to achieve a sort of mixture of the behaviors -- like this book, which generates static code in the server but uses JS to render the pages, splitting each page into a different JS file to only load the page you are reading. It's almost as fast as pure HTML, but you can create dynamic pages easily.

Considering the advantages of SSR, we went full circle and started to essentially "run the frontend SPA on the server". The browser downloads a pre-rendered HTML page with data, then it runs the SPA code to make the page reactive and dynamic, which is called hydrating. Of course, this complicates things again. You need Node.js to run the frontend JS code on the server, and you increase the server load. As always, it's a trade-off.

In this book we'll do SPA approach where we do not pre-render or SSR the page, but we do fill the metadata to make previews possible. It's up to you whether to follow this approach. Laravel can use Blade templates to render content statically, which might be more fitting for your problem.

## GraphQL or REST?

There are currently three most popular standards that are used to transfer data between server and clients by polling: SOAP, REST and GraphQL.

SOAP, Simple Object Access Protocol, is a standaard protocol originally developed by Microsoft. SOAP has a more rigid set of rules and relies on XML to transfer data. SOAP is integrated into some technologies such as DCOM and CORBA. We'll not discuss it further here.

REST (Representational State Transfer) is a very popular transfer technology. The idea is that you have endpoints mapped to web routes, such as "/post/[id]". REST is lightweight and usually transfers JSON, but you can pick whatever data format it's more useful -- even more than one. HTTP provides action verbs (GET, POST, PUT and DELETE), which indicate which operation is being performed. REST is populare because it's easy to implement: you write code for the endpoint in a controller and you're running.

GraphQL is a query language for APIs. It is also a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API. It is more powerful since the client can decide what information it wants. It was originally developed by Facebook and used internally, and now it's controlled by a foundation under the Linux Foundation. Nowadays it is supported by good tools and has a pleasant side-effect -- you don't need to write communication code anymore. In fact, in the approach favored by this book you don't have to write controllers. The GraphQL library does it for you, and you get basic CRUD operation for free. There's only one endpoint and there's a language to describe data, queries and mutations. GraphQL also lets you subscribe to data, therefore providing push communication as well.

You can use GraphQL and REST in the same application. They are not even exactly the same thing. But GraphQL with a proper library is very easy to use and makes you write way less code. We'll see that it has enough information to even help us to avoid not only writing controllers, but generating a lot of the code we'll need automatically.

## Monolith versus microservices

There is a long standing discussion in computer programming as a whole whether to use a monolith approach or a microapproach. Like any debate it will never be settled.

Microservice proponents argue that it's easier to maintain a small program, that they are less prone to bugs and that it's easier to split it into different teams. It's also easier to scale, since each service can be deployed independently of the rest, so it's trivial to spread over multiple servers. The reality is that microservices need to talk to each other and there are many problems relating to getting data without overruning the network and other services with internal requests. For example, in order to avoid doing a database hit to validate users or fetch their data on requests, a very common need, one approach is to store user data in the client with a validation mechanism such as HMAC.

Monolith proponents argue that the architecture is much simpler, and that you can scale through different means, such as having database servers separated from the web servers -- something that is still easier these days using cloud services that handle a good chunk of scaling problems by themselves. They also say that while microservices might be simpler as a unit, they need to communicate with each other, and integration problems happen often, which are much more difficult to test with different services.

As always, if you pull the blanket to cover your shoulders you are uncovering your feet, and vice-versa.

It's undeniable that monolith applications are easier to write and that they cover very well simple cases. It's one thing to make an app for a few thousand users and one for a billion users. We'll take the monolith approach in this book for that reason, but a lot of the concepts here -- and this is related mostly to the backend, since this tends to be transparent for the frontend -- can be applied to microservices as well.

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

### Who can do each of those operations?

Not every operation can be done by every user. You don't want John changing Mary's profile, or Paul accessing Jane's invoices. So both queries and mutations need to be restricted with policies. For each item in your query and mutation list describe the restrictions. Do it from the start; it's better to have all endpoints blocked by default than to forget one of them.

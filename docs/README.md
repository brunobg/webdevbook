---
home: true
heroText: A full stack approach to integrated web and native app development
tagline: Creating native and web apps using GraphQL, Vue, NativeScript and Laravel
actionText: Read the book →
actionLink: ./frontend/introduction.md
features:
  - title: VueJS SPA Frontend
    details: Use the VueJS framework to build your frontend
  - title: Nativescript
    details: Generate native mobile applications sharing code with the web version
  - title: Laravel/GraphQL backend
    details: A standard PHP backend with GraphQL endpoints
---

This book is about how to design the architecture and implement a full web/native application following modern (2020) practices, with a Single Page Application (SPA) frontend and a native application on mobile devices written in Javascript, and a backend in PHP with GraphQL. So, both frontend and backend are covered, although they are split into two independent volumes.

## What is this book about?

This book is about how to design the architect of an application and have a code that works well and is maintanable. It goes through the entire process of creating an application, with tips about what you should consider and what you should pay attention to. It also explains how to solve a few common problems that are present in most current web/native applications.

This book details one possible path, which is of course not the only possible way to do it, and not even the most cutting edge way released yesterday -- which is old by tomorrow. The book describes a traditional approach with good general guidelines that work well, with proven, modern and widely used tools and practices. It's simple to setup and scales well enough except for very large sites.

The book goes through the usual the gotchas that someone implementing a real life project will face, so hopefully it will avoid you many hours of reading StackOverflow, unresolved issues on Github and forums in foreign languages that apparently are the only place in the web that has the exact error message you are getting.

The book is divided in two parts, the [frontend](./frontend/introduction.md) and [backend](./backend/introduction.md), which are completely independent and can be read in separate if you only are interested in one them.

## What is this book not about?

While it tries to cover the architecture as a whole and present details of how to setup, this book is not a step-by-step tutorial for new programmers. You should know JS or PHP already, know programming and what is a database and what is reactive code. If you are upgrading your skills or coming from other areas of development, or perhaps want to get used to Vue or Laravel, this book is for you.

This book is not about microservices. I take a monolith approach here, although we discuss a few possibilities to split services.

I had to make a few choices about frameworks. Two are major ones: Laravel and VueJS. Most of the book -- certainly all the theory -- applies if you are using something else, like React or CodeIgniter, and even JS backend frameworks, but of course the actual code details might not. So, skim the code and it's still useful to you.

I won't talk about content. That means I barely brush SEO, for example. I am also not going to talk much about design, usability and UX. It's highly recommended that you read about it if you are a frontend programmer, even if you are not the actual designer. I talk very little about CSS, only the scaffolding and compilers such as SASS or LESS to get your code running and a few basic implementation guidelines.

This is not a book about devops. It won't talk about how to prepare a server or use cloud services. There are tons of possibilities these days and it would be impossible to cover a fraction of them without writing three times as much.

## What is covered?

This book goes through the almost the entire stack of development tools used these days: frontend, backend, style sheet languages, web apis, databases, bundlers, deployment process, unit testing, end to end testing, continuous integration, continuous delivery. This provides good foundation for a full stack developer if you read both parts, and an architecture that works and scales well except for the largest deployments.

## Is there code?

Last, but not least, the base code from this book is available on the [frontend]() and [backend]() repositories. This should be useful for experienced developers as well as a quick scaffolding for apps, so you can be up and running with a web/native application and backend in very little time, and with working solutions for boring things like authentication or internalization.

### The tech stack

There are billions (ok, perhaps only millions) of languages, frameworks, databases and protocols these days. We use [Vue](https://vuejs.org) with [Nativescript](https://nativescript.org/) for the frontend through the [Nativescript/Vue integration](https://nativescript-vue.org/). If you don't care about native apps you can just ignore the Nativescript parts. This book is not a tutorial of how VueJS works. There are plenty of tutorials about that already. If you never used Vue, please read about it first.

We use [Laravel](https://laravel.com) for the backend, but the concepts would apply to any other backend as well. Laravel is a pretty low level framework for these days, but we can see the entire backend stack with it. Again, this is not a basic Laravel introduction, so it might move a bit fast you have never developed anything using it before and an introduction tutorial might be a good read first.

We'll setup a [Graphql](https://graphql.org/) endpoint for the backend, though briefly talk about REST endpoints and controllers as well. We use [Lighthouse](https://lighthouse-php.com/) and [Modelarium](https://github.com/Corollarium/modelarium) to help us. Other than the details of the communication you can implement the backend/frontend of this book paired a completely different frontend/backend.

### About the author

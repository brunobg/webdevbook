---
home: true
heroText: "From a napkin to the cloud: full stack web projects"
tagline: "Full stack integrated web and native app management and development, using GraphQL, Vue, NativeScript and Laravel"
actionText: Software projects →
actionLink: ./project/introduction.md
actionText2: Frontend development →
actionLink2: ./frontend/introduction.md
actionText3: Backend development →
actionLink3: ./backend/introduction.md
features:
  - title: VueJS SPA Frontend
    details: Use the VueJS framework to build your frontend
  - title: Nativescript
    details: Generate native mobile applications sharing code with the web version
  - title: Laravel/GraphQL backend
    details: A standard PHP backend with GraphQL endpoints
---

## What is this book about?

This book is about how to design the architecture and implement a full web/native application following modern practices. By the end you should be able to build a Single Page Application (SPA) frontend and a native application on mobile devices written in Javascript, and a backend in PHP with GraphQL. So, both frontend and backend are covered, although they are split into two independent volumes. It also covers project management itself. Even if you are not a project manager, this section should be very useful for you.

There are three independent sections:

1. [Project](/project): how to start a new project? How to manage a project? What are the usual pitfalls? How to have proper development flow?
2. [Frontend](/frontend): how to develop frontend? What should you know? How to structure your code? How to communicate with backend? What are the main web technologies you should know?
3. [Backend](/backend): how to develop backend? How to make it a simple and effective architecture? How to handle scalability?

The book goes through the entire process of creating an application, with tips about what you should consider and what you should pay attention to. It also explains how to solve a few common problems that are present in most current web/native applications.

This book details one possible path, which is of course not the only possible way to do it, and not even the most cutting edge way released yesterday -- which is old by tomorrow. The book describes a widely used approach with good general guidelines that work well, with proven, modern and widely used tools and practices. It's simple to setup and scales well enough except for very large sites. You certainly should know this basic approach before venturing into more complex architectures.

The book goes through the usual the gotchas that someone implementing a real life project will face, so hopefully it will avoid you many hours of reading StackOverflow, unresolved issues on Github and forums in foreign languages that apparently are the only place in the web that has the exact error message you are getting.

## What is this book not about?

While it tries to cover the architecture as a whole and present details of how to setup, this book is not a step-by-step tutorial for new programmers. You should know JS or PHP already, and be familiar with concepts like what is a database and what is reactive code. If you are upgrading your skills or coming from other areas of development, this book is for you. If you are completely new to programming, this book won't go through the basics.

I had to make a few choices about frameworks. Two are major ones used in this book: Laravel and VueJS. Most of the book -- certainly all the theory -- applies if you are using other frameworks and even languages, but of course the actual code details might not. So, if you are here not really interested about a specific implementation, just skim the code and it's still useful to you. Also, this book is not about microservices. I take a monolith approach here, which is simpler, although we discuss a few possibilities to split services.

I won't talk about site content. That means I barely brush SEO, for example. While there are some specific chapter about design, usability and UX, it's a very shallow overview and you should read more specific material: there's enough there for one, if not many more, entires book on its own. But it's highly recommended that you read about this topic if you are a frontend programmer, even if you are not the actual designer. I talk very little about CSS, mostly scaffolding and compilers such as SASS or LESS to get your code running, with a few basic implementation guidelines.

This is not a book about devops. It won't talk about how to prepare a server or use cloud services. There are tons of possibilities these days and it would be impossible to cover a fraction of them without writing three times as much. This book just goes over the basics of what you should expect, want and use from cloud services.

## What is covered?

This book goes through the almost the entire stack of development tools used these days: frontend, backend, style sheet languages, web apis, databases, bundlers, deployment process, unit testing, end to end testing, continuous integration, continuous delivery. This provides good foundation for a full stack developer if you read both parts. This book goes over code and infrastructure architecture, talking about what you should have in mind, ideas that works and scales well except for the largest deployments. It also goes over good practices, software methodology, project management and what everyone should know about design.

## Is there code?

This book does not create a single application, and there's not a single repository with its code, but there are code examples in repos for you to download, read and run. This should be useful for experienced developers as well as a quick scaffolding for apps, so you can be up and running with a web/native application and backend in very little time, and with working solutions for boring things like authentication or internalization.

You should check the [Modelarium HelloWorld](https://github.com/Corollarium/modelarium-helloworld) example for a very simple web app. A more involved example is at [Modelarium Example](https://github.com/Corollarium/modelarium-example).

### The tech stack

There are billions (ok, perhaps only millions) of languages, frameworks, databases and protocols these days. Our tech stack is used mostly to illustrate the examples, but if you skip the code fragments this book should be useful no matter what tech stack you prefer.

We use [Vue](https://vuejs.org), and we use [Nativescript](https://nativescript.org/) for a mobile native app interface through the [Nativescript/Vue integration](https://nativescript-vue.org/). If you don't care about native apps you can just ignore the Nativescript parts. This book is not a tutorial of how VueJS works. There are plenty of tutorials about that already. If you never used Vue, please read about it first.

We use [Laravel](https://laravel.com) for the backend, but the concepts would apply to any other backend as well. Laravel is a pretty low level framework for these days, but we can see the entire backend stack with it. Again, this is not a basic Laravel introduction, so it might move a bit fast you have never developed anything using it before and an introduction tutorial might be a good read first.

We'll setup a [Graphql](https://graphql.org/) endpoint for the backend, though briefly talk about REST endpoints and controllers as well. We use [Lighthouse](https://lighthouse-php.com/) and [Modelarium](https://github.com/Corollarium/modelarium) to help us. Other than the details of the communication you can implement the backend/frontend of this book paired a completely different frontend/backend.

We use SQL databases as a backend (without a specific flavor), though there is only on chapter specifically about it.

### About the author

Bruno Barberi Gnecco is an electrical engineer with a long experience of software development and project management, including web and mobile applications, virtual and augmented reality, and image and video processing. Founder of [Corollarium Technologies](https://corollarium.com), which specializes in software development in these areas.

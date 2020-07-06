---
home: true
heroText: A full stack approach to integrated web and native app development
tagline: Creating native and web apps using Vue, NativeScript and Laravel
actionText: Read the book →
actionLink: ./frontend/introduction.md
features:
  - title: VueJS Frontend
    details: Use the VueJS framework to build your frontend
  - title: Nativescript
    details: Generate native mobile applications sharing code with the web version
  - title: Laravel/GraphQL backend
    details: A standard PHP backend with GraphQL endpoints
---

This book is about how to architecture and implement a full web/native application following modern (2020) practices, with a Single Page Application (SPA) frontend and a native application on mobile devices written in Javascript. Both frontend and backend are covered.

This book is about how to architect an application and have a code that works, and how to solve a few common problems that are present in most current web/native applications. The book details one possible path, which is of course not the only possible way to do it, and not even the most cutting edge way -- which is old by tomorrow. But it's a good general guideline that works well, is simple to setup, scales and uses current but established tools. The book is divided in two parts, the [frontend](./frontend/introduction.md) and [backend](./backend/introduction.md), which are completely independent and can be read in separate if you only are interested in one them.

While it tries to cover the architecture as a whole and present details of how to setup, this book is not a step-by-step tutorial for new programmers. You should know JS or PHP already, have some idea of what is a SPA and what is reactive code. If you are upgrading your skills or coming from other areas of development, or perhaps want to get used to Vue or Laravel, this book is for you. It goes through all the gotchas that someone implementing a real life project will face, so hopefully it will avoid you many hours of reading StackOverflow, unresolved issues on Github and forums in foreign languages that apparently are the only place in the web that has the exact error message you are getting.

On the other hand, this book goes through the almost the entire stack of development tools used these days: frontend, backend, style sheet languages, web apis, databases, bundlers, deployment, unit testing, end to end testing, continuous integration, continuous delivery. This provides good foundation for a full stack developer if you read both parts, and an architecture that works and scales well except for the largest deployments.

Last, but not least, the base code from this book is available on the [frontend]() and [backend]() repositories. This should be useful for experienced developers as well as a quick scaffolding for apps, so you can be up and running with a web/native application and backend in very little time, and with working solutions for boring things like authentication or internalization.

### The tech stack

There are billions (ok, perhaps only millions) of languages, frameworks, databases and protocols these days. We use [Vue](https://vuejs.org) with [Nativescript](https://nativescript.org/) for the frontend through the [Nativescript/Vue integration](https://nativescript-vue.org/). This book is not a tutorial of how VueJS works. There are plenty of tutorials about that already. If you never used Vue, please read about it first.

We use [Laravel](https://laravel.com) for the backend, but the concepts would apply to any other backend as well. Laravel is a pretty low level framework for these days, but we can see the entire backend stack with it. Again, this is not a basic Laravel introduction, so it might move a bit fast you have never developed anything in PHP before.

We'll setup a Graphql endpoint for the backend, though briefly talk about REST endpoints and controllers as well. Other than the details of the communication you can implement the backend/frontend of this book paired a completely different frontend/backend.

### About the author

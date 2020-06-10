# Web and Native App Development 

## Creating native and web apps using Vue, NativeScript and Laravel

### By Bruno Barberi Gnecco

This book details how to setup a full web/native application following modern (2020) practices, with a Single Page Application (SPA) frontend and a native application on mobile devices programmed in Javascript. This is of course not the only possible way to do it, and not even the most cutting edge way. But it's a good general guideline that works well, is simple and uses current but established tools. The book is divided in two parts, the frontend and backend. They are completely independent and can be read in separate. 

This book is not a step-by-step tutorial for new programmers. You should know JS or PHP already, and have some idea of what is a SPA. This book is about how to architect an application and have a code that works, and how to solve a few common problems that are present in most current web/native applications. If you are upgrading your skills or coming from other areas of development, or perhaps want to get used to Vue or Laravel, this book is for you. It goes through all the gotchas that someone implementing a real life project will face, so hopefully it will avoid you many hours of reading StackOverflow, unresolved issues on Github and forums in foreign languages that apparently are the only place in the web that has the exact error message you are getting.

On the other hand, this book goes through the almost the entire stack of development tools used these days: frontend, backend, style sheet languages, databases, bundlers, deployment, unit testing, end to end testing, continuous integration, continuous delivery -- we only skip virtualization tools. This provides good foundation for a full stack developer -- if you read both parts.

Last, but not least, the base code from this book is available on the [frontend]() and [backend]() repositories. This should be useful for experienced developers as well as a quick scaffolding for apps, so you can be up and running with a web/native application and backend in very little time, and with working solutions for boring things like authentication or internalization.

There are billions (ok, perhaps only millions) of languages, frameworks, databases and protocols these days. We use [Vue](https://vuejs.org) with [Nativescript](https://nativescript.org/) for the frontend through the [Nativescript/Vue integration]https://nativescript-vue.org/). This book is not a tutorial of how VueJS works. There are plenty of tutorials about that already. If you never used Vue, please take a look at it first. We'll explain how to use it to implement an application, but not how it works per se.

We use [Laravel](https://laravel.com) for the backend, but the concepts would apply to any other backend as well. Laravel is a pretty low level framework for these days, but we can see the entire backend stack with it. Again, this is not a basic Laravel introduction, so it might move a bit fast you have never developed anything in PHP before.

REST might be old, but it's simple to implement in any language and framework. In fact, if you stick to REST for communication you can implement the backend/frontend paired a completely different frontend/backend while using exactly what is written in this book. You can swap REST for GraphQL or other kind of backend access, by just swapping the communication class. The frontend structure we propose isolates communication in a single file, which makes it easy to swap without changing the rest of the code. There are adapters to use GraphQL with Laravel, so it's not very difficult to replace it on the backend as well, although it would require a change to the controller/policy code.

### About the author
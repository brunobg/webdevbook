(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{357:function(e,t,o){"use strict";o.r(t);var a=o(42),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("p",[e._v("This book is about how to design the architecture and implement a full web/native application following modern (2020) practices, with a Single Page Application (SPA) frontend and a native application on mobile devices written in Javascript, and a backend in PHP with GraphQL. So, both frontend and backend are covered, although they are split into two independent volumes.")]),e._v(" "),o("h2",{attrs:{id:"what-is-this-book-about"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#what-is-this-book-about"}},[e._v("#")]),e._v(" What is this book about?")]),e._v(" "),o("p",[e._v("This book is about how to design the architect of an application and have a code that works well and is maintainable. It goes through the entire process of creating an application, with tips about what you should consider and what you should pay attention to. It also explains how to solve a few common problems that are present in most current web/native applications.")]),e._v(" "),o("p",[e._v("This book details one possible path, which is of course not the only possible way to do it, and not even the most cutting edge way released yesterday -- which is old by tomorrow. The book describes a traditional approach with good general guidelines that work well, with proven, modern and widely used tools and practices. It's simple to setup and scales well enough except for very large sites. You certainly should know this basic approach before venturing into more complex architectures.")]),e._v(" "),o("p",[e._v("The book goes through the usual the gotchas that someone implementing a real life project will face, so hopefully it will avoid you many hours of reading StackOverflow, unresolved issues on Github and forums in foreign languages that apparently are the only place in the web that has the exact error message you are getting.")]),e._v(" "),o("p",[e._v("The book is divided in two parts, the "),o("RouterLink",{attrs:{to:"/frontend/introduction.html"}},[e._v("frontend")]),e._v(" and "),o("RouterLink",{attrs:{to:"/backend/introduction.html"}},[e._v("backend")]),e._v(", which are completely independent and can be read in separate if you only are interested in one them.")],1),e._v(" "),o("h2",{attrs:{id:"what-is-this-book-not-about"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#what-is-this-book-not-about"}},[e._v("#")]),e._v(" What is this book not about?")]),e._v(" "),o("p",[e._v("While it tries to cover the architecture as a whole and present details of how to setup, this book is not a step-by-step tutorial for new programmers. You should know JS or PHP already, know programming and what is a database and what is reactive code. If you are upgrading your skills or coming from other areas of development, or perhaps want to get used to Vue or Laravel, this book is for you.")]),e._v(" "),o("p",[e._v("This book is not about microservices. I take a monolith approach here, although we discuss a few possibilities to split services.")]),e._v(" "),o("p",[e._v("I had to make a few choices about frameworks. Two are major ones: Laravel and VueJS. Most of the book -- certainly all the theory -- applies if you are using something else, like React or CodeIgniter, and even JS backend frameworks, but of course the actual code details might not. So, skim the code and it's still useful to you.")]),e._v(" "),o("p",[e._v("I won't talk about content. That means I barely brush SEO, for example. I am also not going to talk much about design, usability and UX. It's highly recommended that you read about it if you are a frontend programmer, even if you are not the actual designer. I talk very little about CSS, only the scaffolding and compilers such as SASS or LESS to get your code running and a few basic implementation guidelines.")]),e._v(" "),o("p",[e._v("This is not a book about devops. It won't talk about how to prepare a server or use cloud services. There are tons of possibilities these days and it would be impossible to cover a fraction of them without writing three times as much.")]),e._v(" "),o("h2",{attrs:{id:"what-is-covered"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#what-is-covered"}},[e._v("#")]),e._v(" What is covered?")]),e._v(" "),o("p",[e._v("This book goes through the almost the entire stack of development tools used these days: frontend, backend, style sheet languages, web apis, databases, bundlers, deployment process, unit testing, end to end testing, continuous integration, continuous delivery. This provides good foundation for a full stack developer if you read both parts, and an architecture that works and scales well except for the largest deployments.")]),e._v(" "),o("h2",{attrs:{id:"is-there-code"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#is-there-code"}},[e._v("#")]),e._v(" Is there code?")]),e._v(" "),o("p",[e._v("Last, but not least, the base code from this book is available on the "),o("a",{attrs:{href:""}},[e._v("frontend")]),e._v(" and "),o("a",{attrs:{href:""}},[e._v("backend")]),e._v(" repositories. This should be useful for experienced developers as well as a quick scaffolding for apps, so you can be up and running with a web/native application and backend in very little time, and with working solutions for boring things like authentication or internalization.")]),e._v(" "),o("h3",{attrs:{id:"the-tech-stack"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#the-tech-stack"}},[e._v("#")]),e._v(" The tech stack")]),e._v(" "),o("p",[e._v("There are billions (ok, perhaps only millions) of languages, frameworks, databases and protocols these days. We use "),o("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue"),o("OutboundLink")],1),e._v(" with "),o("a",{attrs:{href:"https://nativescript.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nativescript"),o("OutboundLink")],1),e._v(" for the frontend through the "),o("a",{attrs:{href:"https://nativescript-vue.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nativescript/Vue integration"),o("OutboundLink")],1),e._v(". If you don't care about native apps you can just ignore the Nativescript parts. This book is not a tutorial of how VueJS works. There are plenty of tutorials about that already. If you never used Vue, please read about it first.")]),e._v(" "),o("p",[e._v("We use "),o("a",{attrs:{href:"https://laravel.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("Laravel"),o("OutboundLink")],1),e._v(" for the backend, but the concepts would apply to any other backend as well. Laravel is a pretty low level framework for these days, but we can see the entire backend stack with it. Again, this is not a basic Laravel introduction, so it might move a bit fast you have never developed anything using it before and an introduction tutorial might be a good read first.")]),e._v(" "),o("p",[e._v("We'll setup a "),o("a",{attrs:{href:"https://graphql.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Graphql"),o("OutboundLink")],1),e._v(" endpoint for the backend, though briefly talk about REST endpoints and controllers as well. We use "),o("a",{attrs:{href:"https://lighthouse-php.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Lighthouse"),o("OutboundLink")],1),e._v(" and "),o("a",{attrs:{href:"https://github.com/Corollarium/modelarium",target:"_blank",rel:"noopener noreferrer"}},[e._v("Modelarium"),o("OutboundLink")],1),e._v(" to help us. Other than the details of the communication you can implement the backend/frontend of this book paired a completely different frontend/backend.")]),e._v(" "),o("h3",{attrs:{id:"about-the-author"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#about-the-author"}},[e._v("#")]),e._v(" About the author")]),e._v(" "),o("p",[e._v("Bruno Barberi Gnecco is an electrical engineer with a long experience of software development and project management, including web and mobile applications, virtual and augmented reality, and image and video processing. Founder of "),o("a",{attrs:{href:"https://corollarium.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("Corollarium Technologies"),o("OutboundLink")],1),e._v(", which specializes in software development in these areas.")])])}),[],!1,null,null,null);t.default=r.exports}}]);
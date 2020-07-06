(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{358:function(e,t,a){"use strict";a.r(t);var o=a(43),r=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"architecture-and-scaffolding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#architecture-and-scaffolding"}},[e._v("#")]),e._v(" Architecture and scaffolding")]),e._v(" "),a("p",[e._v("We will talk about the Laravel application code structure and backend planning in this book, but we can also save a few thousand keystrokes by using a scaffold generator from GraphQL models. Let's understand what is GraphQL and how to architect it all.")]),e._v(" "),a("p",[e._v("TODO\nDatabase\nModels\nControllers\nPolicies\nEvents\nRoutes")]),e._v(" "),a("h2",{attrs:{id:"graphql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#graphql"}},[e._v("#")]),e._v(" GraphQL")]),e._v(" "),a("p",[e._v("TODO\nWhat is GraphQL?\nHow to describe models?")]),e._v(" "),a("h2",{attrs:{id:"scaffolding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scaffolding"}},[e._v("#")]),e._v(" Scaffolding")]),e._v(" "),a("p",[e._v("There's a lot of structure in a regular web application to implement all the items above. So we'll use the GraphQL Schema Definition Language (SDL) to describe your data and add functionality through server-side directives. We'll use "),a("a",{attrs:{href:"https://github.com/Corollarium/modelarium",target:"_blank",rel:"noopener noreferrer"}},[e._v("Modelarium"),a("OutboundLink")],1),e._v(" and "),a("a",{attrs:{href:"https://lighthouse-php.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("Lighthouse"),a("OutboundLink")],1),e._v(" to get rid of most of the scaffolding and focus on the code itself.")]),e._v(" "),a("p",[a("strong",[e._v("Lighthouse")]),e._v(" is a framework for serving GraphQL from Laravel.")]),e._v(" "),a("p",[a("strong",[e._v("Modelarium")]),e._v(" is a framework for generating code scaffolding from GraphQL SDL, creating all the files you need to focus on the logic itself. It generates Laravel code structure as well as frontend components with its companion "),a("strong",[e._v("Formularium")]),e._v(".")]),e._v(" "),a("p",[e._v("We'll use both extensively in this book, describing operations from the user's point of view, which is what GraphQL describes. We'll also explain what the tools are doing and generating.")]),e._v(" "),a("p",[e._v("So let's add these deps to our project:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("composer require corollarium/modelarium corollarium/formularium nuwave/lighthouse\n")])])]),a("h2",{attrs:{id:"designing-your-data-models"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#designing-your-data-models"}},[e._v("#")]),e._v(" Designing your data models")]),e._v(" "),a("p",[e._v("This is arguably the most important part of your application, and certainly the one that requires most thought in its design.")]),e._v(" "),a("h3",{attrs:{id:"what-types-do-you-have-in-your-system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-types-do-you-have-in-your-system"}},[e._v("#")]),e._v(" What types do you have in your system?")]),e._v(" "),a("p",[e._v("The first question you have to ask yourself is what types your system will have.")]),e._v(" "),a("p",[e._v("You almost certainly will have "),a("code",[e._v("Users")]),e._v(". What do they do? If it's a communication system for example, they might create "),a("code",[e._v("Posts")]),e._v(" and add "),a("code",[e._v("Comments")]),e._v(" to the posts, and probably giving "),a("code",[e._v("Ratings")]),e._v(".")]),e._v(" "),a("p",[e._v("Or you are building an ecommerce store. Perhaps it has "),a("code",[e._v("Users")]),e._v(" to save their information, but you might be selling without even creating a "),a("code",[e._v("User")]),e._v(" entry and storing it all on the invoice. But you have "),a("code",[e._v("Products")]),e._v(", which might have "),a("code",[e._v("Reviews")]),e._v(", and the "),a("code",[e._v("Invoices")]),e._v(" for purchases. But invoices are a complex type, with several rows of different data. So you might want an "),a("code",[e._v("InvoiceItem")]),e._v(" type with the product purchasen, the amount and price, and who bought it.")]),e._v(" "),a("h3",{attrs:{id:"what-are-the-relationships"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-are-the-relationships"}},[e._v("#")]),e._v(" What are the relationships?")]),e._v(" "),a("p",[e._v("Remember, SQL databases do not have arrays as a primary datatype, so whenever you have an array it's probably better to store it as a relationship with another type -- like the "),a("code",[e._v("InvoiceItem")]),e._v(" example. The relationships can be one-to-one, one-to-many or many-to-many. It may be a good idea to draw an ER diagram with your modeling.")]),e._v(" "),a("h3",{attrs:{id:"what-queries-to-do-need"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-queries-to-do-need"}},[e._v("#")]),e._v(" What queries to do need?")]),e._v(" "),a("p",[e._v("It's likely that you'll want to list the entries of a certain type, and fetch information about a specific entry. What about other queries? Perhaps searching products by name, or listing all posts with a specific tag.")]),e._v(" "),a("h3",{attrs:{id:"what-mutations-are-possible-on-each-type"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-mutations-are-possible-on-each-type"}},[e._v("#")]),e._v(" What mutations are possible on each type?")]),e._v(" "),a("p",[e._v("You need to be able to create a type instance, such as a new "),a("code",[e._v("Post")]),e._v(" or new "),a("code",[e._v("Product")]),e._v(". Do you want to delete them though? You might want to keep them forever. What about editing? Can you change that instance after it's created? The basic operations on a type (CRUD, for Create, Read, Update, Delete) are not necessarily implemented for all types. You might not even want to expose a create operation if you have a limited, fix set of instances that are generated during the setup of your application -- for example, t-shirt sizes.")]),e._v(" "),a("p",[e._v("With GraphQL all the operations that generate changes to the database are called "),a("em",[e._v("mutations")]),e._v(". We're going to list all mutations and organize them with the model type definition to make them easier to find. Sometimes creating can be a mutation in another type: for example, creating a comment can be a "),a("code",[e._v("commentPost")]),e._v(" mutation. Adding new pictures can be a "),a("code",[e._v("postPhoto")]),e._v(" mutation.")]),e._v(" "),a("p",[e._v("List the operations that you'll use.")]),e._v(" "),a("h3",{attrs:{id:"who-can-do-those-operations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#who-can-do-those-operations"}},[e._v("#")]),e._v(" Who can do those operations?")]),e._v(" "),a("p",[e._v("Not every operation can be done by every user. You don't want John changing Mary's profile, or Paul accessing Jane's invoices. So both queries and mutations need to be restricted with policies. For each item in your query and mutation list describe the restrictions. Do it from the start; it's better to have all endpoints blocked by default than to forget one of them.")])])}),[],!1,null,null,null);t.default=r.exports}}]);
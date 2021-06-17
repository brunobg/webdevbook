# What everyone should know about software projects

So, you have a new software project. This section may be interesting even for non-developers: perhaps you want to build your own app. Or you are a software developer with a new project that you are leading for the first time. You are creating your own startup. You want to invest on a software product. No matter what the reason, this section is a very brief overview of what you should have in mind.

The basic truth is: **we don't know how to build software like we build skyscrapers yet**. Our methodologies have improved with time, but a [lot of projects still fail](https://www.projectsmart.co.uk/white-papers/chaos-report.pdf): only about 1/3 of the projects are considered successful. When you take into account large projects only, that figure drops to 8%. Time overruns? The average overrun is 222% of the original time estimate, and only 14% of the projects had less than 20% of overrun.

There are many reasons why projects fail. That report from the [Standish Group](https://www.projectsmart.co.uk/white-papers/chaos-report.pdf) lists the most common factors for challenged projects:

| #   | Reason                                   | Percentage |
| --- | ---------------------------------------- | ---------- |
| 1.  | Lack of User Input                       | 12.8%      |
| 2.  | Incomplete Requirements & Specifications | 12.3%      |
| 3.  | Changing Requirements & Specifications   | 11.8%      |
| 4.  | Lack of Executive Support                | 7.5%       |
| 5.  | Technology Incompetence                  | 7.0%       |
| 6.  | Lack of Resources                        | 6.4%       |
| 7.  | Unrealistic Expectations                 | 5.9%       |
| 8.  | Unclear Objectives                       | 5.3%       |
| 9.  | Unrealistic Time Frames                  | 4.3%       |
| 10. | New Technology                           | 3.7%       |

And these are the factors that impaired and cancelled projects:

| #   | Reason                                 | Percentage |
| --- | -------------------------------------- | ---------- |
| 1.  | Incomplete Requirements                | 13.1%      |
| 2.  | Lack of User Involvement               | 12.4%      |
| 3.  | Lack of Resources                      | 10.6%      |
| 4.  | Unrealistic Expectations               | 9.9%       |
| 5.  | Lack of Executive Support              | 9.3%       |
| 6.  | Changing Requirements & Specifications | 8.7%       |
| 7.  | Lack of Planning                       | 8.1%       |
| 8.  | Didn't Need It Any Longer              | 7.5%       |
| 9.  | Lack of IT Management                  | 6.2%       |
| 10. | Technology Illiteracy                  | 4.3%       |

Notice how the two main factors were linked to incomplete and changing requirements and lack of user involvement. The rest of this chapter will go over many common problems, but here is a TL;DR: for you:

:::tip

The two most important things to do in your project:

1. Involve users early and often, and talk about your project to your customer base.
2. Know what you are building, have a clear roadmap and clear requirements.

:::

## What is your project?

Your first task as someone responsible for a software, be it the entire project or a small module, is to have a very good idea of what you are trying to build. And this is valid for your startup, too. You need to be able to answer these questions:

1. What does it do? You must be able to answer this in a short sentence.
2. How does it do it? This is where you give a short explanation -- two or three sentences. If it's about the entire project, even a non-technical person should be able to follow it. If it's a technical module, be brief so the other technical person can understand it quickly.
3. How complex is it? Here you can explain what will be required to build it and how hard it will be, and you should be able to give an estimate in man-hours.
4. What are the main problems you'll face when implementing it? If you know what is likely to go wrong you can avoid potential problems and be ready for the "unknown unknowns".

If you can answer these questions, you have a solid understand of what you are about to do.

Let's apply it to a few well know pieces of software. See how you can easily guess which one it is just from the answers.

1. What does it do?
   - It allows you to search the web.
2. How does it do it?
   - It creates an index of every web page around, and uses certain metrics to rank which pages are better related to your search query.
3. How complex is it?
   - It's fairly complex: it has to continuously read the entire web, store a local copy of webpages in a way that is really fast to search and have very well calibrated metrics to find the best results. It also needs to be robust to be always online, and not be prone to spamming.
4. What are the main problems you'll face when implementing it?
   - Crawling vast amounts of pages will require considerable bandwidth and a smart software to find these pages and not be caught in loops. Storage will be in petabytes, so you'll need an efficient way to store the pages in a previously parsed form and with extremely fast index and search algorithms. Everything needs to be distributed among vast hordes of computers, so you need proper management for them and you need to be fault-tolerant, because in those numbers and handling external data things are bound to break.

Let's try another one.

1. What does it do?
   - People post short messages, with a social structure for interaction.
2. How does it do it?
   - Every person has a profile and they can easily post short messages, photos and videos. You can easily follow other people, like and reply to their posts.
3. How complex is it?
   - It's fairly simple in terms of features, but since it's real time you should have push notifications and a good infrastructure to handle vast amounts of small pieces data with constant write operations.
4. What are the main problems you'll face when implementing it?
   - It has to scale well. Your database will store gazillions of short strings, you'll have a social graph to take care of, and you expect lots of writes: so your database needs to be able to handle these things well and have room for growth. You'll need to index and search this data as well, and since recent posts matter more than old ones you need a real-time updated list of what is happening.

Note that these four questions are not nearly enough to define your application, but you'll be surprised with how many people are in the middle of a project and yet couldn't give short answers to them right away. They can answer about their favorite apps better than about their own projects.

## Know what you want before you start

If you learn one thing from this chapter it should be this one:

::: comment
Have a clear and well written specification.
:::

Imagine you are building a house. Are you going to hire people and say “well, I want a house. Start it and we’ll define things along the way”? No, you draw a blueprint, you make a 3D model to see what it will look like, the engineer will plan its structure to hold its weight properly, the architect will make it look pretty and define materials, you'll think about the size of your living room before you buy a couch. **Why should it be different with software?**

There are many ways to specify software, some very technical and complex. One you should definitely do (particularly for web/mobile apps, which is the main target of this book) is literally to draw your software: do a wireframe (what we call sketching the software screens). You can draw it yourself if you are the creator of your app (but get a designer to redo it properly, before it is implemented). At this point you should not be worried with the design details, colors, beauty, even usability. It should have everything you want, however. Draw all the screens you think you need. This guarantees that the project has a good overview of what to build.

What you are striving for here is a simple, consistent way to let users do something. Try to focus here: instead of allowing for all kinds of options, make sure that the most common paths can be done very quickly and easily. A good UX designer will be able to take an idea and make a proper flow, that is simple and clear. Once you get a proper wireframe from a designer, based on the minimum version you had before, you have a good way to check if it's good. Then developers can implement it, and managers can check if it was implemented as specified.

## Do not change your project mid way

Going back to the house example, what happens if you suddenly decide that you want a pool on the middle of the living room, a basement that wasn't planned for when you are already building the second floor, or perhaps and four extra floors when half the house is already built? Makes no sense, right? Yet that is what people often do with software.

::: comment
“Let's add this extra unplanned thing” is a sure way to get delays and bugs.
:::

People often start with a software to organize recipes and in two months decide it should include a flight simulator. No.

Once you start development, freeze the features for each milestone. All those great new ideas you have, write them somewhere. Wait for the software to be ready and working, delivered as planned. Get a version out first that does what it was designed to do.

Now, it's true that things change, but if you realized midway of your project that your market is very different and you are pivoting and changing half of your software, understand that you may need to throw away parts of the existing code and write them from scratch. Unless you want a Frankenstein monster that will bite you in the ass later on. If you do need to make the changes, call your developers and tell them you need several new improvements, and get a new quote. Or sit down if you are the lead developer and get a detailed plan for changes, trying to prioritize what is most urgent, understanding that things might not be perfect but shouldn't be awful.

If you are hiring outside people, remember it's not fair to add new features and expect them to do them for no additional cost. If they accept that they’ll cram it anyway possible to get rid of the backlog as soon as possible, sacrificing quality in the way.

## MVP is not an excuse

MVP, or Minimum Viable Project, is what people strive to get out as soon as possible. Just remember: MVP is not a prototype. It's something your customers will see and hopefully use. And if their first experience with your product is bad, they won't use it again. It's way harder to convince someone to test your software again when they already didn't like it the first time.

You think you have the perfect solution for a certain problem. But would your customers agree with you? Would your users also think it's simple to use? Test it. Show the screens to your users. Make a mockup demo and see how they interact.

Things you should **NOT** ignore in a MVP:

- UI, or user interface. You application has to look good. No excuses. It will certainly look better in time, but make sure the first design is a proper beautiful design. Beauty is very subjective, so ask other people. "Does it look ugly?" is all you need to ask (and to people who won't be afraid to say that it looks ugly if it does).
- UX, or user experience. If users find your application hard to use they won't use it. It has to be consistent, clean, easy to use, intuitive. Again, it's not "I like it". It's "I tried it with my mother and she could use it without any help or instructions". Really. You need to test it with users that have never seen it before.
- killer features. If your application does just basic things, is no better than competition and there's not a single answer for "what's the killer feature that will make users love it", you are decreasing your chances to succeed.
- talking to your customers. Perhaps what you think it's important is not what they think it's important. Perhaps you incredible solution doesn't work for them. Perhaps it should, but they just don't want to change the way they are doing things now.

## Design is important

I’ve not meet yet a developer that is a really good visual designer. To be honest, and I include myself in this category, usually they are awful. And there's another problem, good designers are even more rare than good developers. If you hire a team of developers, either make sure that they have a designer there. But don't expect designers to write code, or to be good product managers. Hire the right people for the job.

The designer is the person who will take the project idea and first description, or perhaps a really rough wireframe, and change them into a beautiful app that people will say “wow that is so pretty”. But the designer should also **make your software easy to use**, which is something many designers just don’t care about, and many project managers disregard. They don’t care that it takes 5 clicks to do a basic operation, and users hate the app.

When interviewing a designer ask about usability. Ask what the designer will do to improve the usability of your software. Ask how he will analyze it. Ask what guidelines he follows. Get a design system.

Interfaces are also not static anymore. You know your website? It has to work on a big 24” screen and in a small old phone, and everything in between. When you click a button, things must happen. In 2005 a designer would give you a Photoshop image and say "good luck". Today any web designer that has no knowledge of CSS (the basic language that makes the web pretty) is more likely to give you a design that is static, boring and perhaps hard to implement.

A good designer will create screens in different sizes, adapt content to the different screens, indicate animations and transitions, and if you are really really lucky, even help to implement these things.

Oh, and can you hire a freelance designer? Yes, and that can work well, but have all this in mind and make an agreement that is clear about the deliveries, any support of future changes.

## Hire the right (and good) people for the job

I’ve not meet yet a developer that is a really good visual designer. To be honest, and I include myself in this category, usually they are awful. And there's another problem, good designers are even more rare than good developers. If you hire a team of developers, either make sure that they have a designer there. But don't expect designers to write code, or to be good product managers. Hire the right people for the job.

You get what you pay for. Software is even worse, because though it will may look fine on the screen, it may be awful under the hood. It's really like a car that looks good but has an old broken engine.

::: comment
Remember that you’ll have to maintain your software for ever. If it starts with a bad architecture and worse implementation it will only go downhill.
:::

New developers are like new anything: they do not have the experience or expertise to build a big project in a well organized way. Even experienced developers often make bad choices and start over (we call that “refactoring” and it's essentially tearing down a wall and building it again).

Hire experienced people who know what they are doing. And for your needs. If you need one logo for a t-shirt store, sure, hire a freelance designer. If you need a designer for your software, then think about it twice. Good freelancers tend to be rare for the single reason that, when they are good, they get offers to be hired.

Hiring a single freelancer for anything other than small projects, like a small website, is a certain way to shoot a project on the foot. I’m tired of hearing stories that go “then the freelancer disappeared” or “he never delivered, was always late” and “it was so buggy and he never fixed it.” Even if they are great (perhaps it's you, reading the book!), remember: software that can be tackled by a single person within a reasonable time frame is uncommon. Most software takes a lot of time to write, and multiple developers.

For anything that will last more than two weeks, four tops, and which will require more work later, either hire a team to work in house, or get a company that knows what it is doing and that you can be sure they won’t just change their email and phone number and disappear.

## Talk about it: people are unlikely to steal your idea

“I want a software but I can’t tell you what it is because you’ll steal it”.

It's true that sometimes people steal ideas, but most people are not going to do that, if not because they are moral just because they lack the expertise, money, time, desire and drive to implement them. It is 99% perspiration. There's a lot of work to make an idea into a prototype, then into a product, then to properly market it. If ideas by themselves were so valuable there would be people selling them. Have you ever bought an idea? Have you ever seen a store selling ideas?

Before you even start a project, you should tell your idea to other people to be sure it will work. Get feedback and see if everyone agrees that your idea is really great. Are they going to use it?

When you’re hiring a developer and want to go over details, just get a Non-Disclosure Agreement and tell them your idea. Any decent developer company will have a NDA ready for you to sign.

## Things break: tests and more tests

In my many years developing and in dozens of projects and customers, I only heard this phrase when being hired as a software house once: “what kind of testing do you do?”

Most non-technical people don’t even know that you can write automated tests; in other words, code to test your code. This is (or at least it should be) mandatory for any project at all. Things break. You change something here and you break something there. It is part of software development. Sometimes you need to make big changes that may have effects all over your software.

To avoid regression you write automated tests. And any respectable developer will keep an eye for these tests all day long, which are ran automatically whenever anything changes. It's called Continuous Integration. Yet usually developers don’t like to do tests for several reasons. First, it's boring! Second, it takes time. Third, customers don’t ask for them or pay more. So why bother?

Then what happens is buggy software that is always broken. Whenever a bug is fixed something else breaks.

My personal rule is to spend about a third of the development time writing and maintaining tests (because tests are code, and they also break and have bugs themselves!). Sometimes we spend even more, around 40% to 50%.

## Maintenance is what will get you

Software is a living thing. You need to support that new browser, that new phone, that new operating system. You need to change the interface because it looks old. You need to integrate with the new platform. Facebook/Google/Anywhere changed their API and you need to update your software. Your customer calls because he needs some feature you don’t have. You invent a new feature you don’t have.

:::comment
It's the maintenance that will get you.
:::

Whenever someone calls me and says “I have an existing software, can you take over and change it a little bit?” I answer as politely as I can “Sure, but I’ll charge you three times as much as I’d charge you to write a new one from scratch”.

Inheriting software from other people is almost always so painful that it's not worth it. When written by “a freelancer that I used to hire” it's almost certain to be the worst thing ever written in the history of computing. No one will want to touch it.

## If you are hiring outside help

If you are hiring a third party to implement a project, be it a company or individuals, be absolutely sure you have a specification before actual coding starts. Preferably

Once you have a detailed specification, you can get a detailed quote, milestones, deliveries, deadlines. Remember that it's hard to estimate cost and time to develop software, and the only reasonable way to do it is to have it detailed and split into small items, which can be properly estimated.

Your contractors must be able to give you a quote and time plan, detailing your software into smaller parts (but not too small). If they don't, either your specification it not clear enough or they are probably not experienced or professional enough; take heed. Make sure you get deliverables that can be checked constantly. Monthly milestones are ideal. Grill people about this plan before you accept it: where can it go wrong? What steps are fuzzier and can take longer than expected? What will happen if things are not delivered in time? How can you be sure that the code being delivered is good (you should be able to get someone else to check it if you are not able to do it yourself)?

With a proper schedule you can track if things are going well and the deadlines are being followed, and get deliverables that make sense and ensure the project is on track.

Also, remember people expect to be paid for their work. “I have an idea that will sell for millions in six months and you’ll get a share of that. But I won’t pay you anything now”. If your idea is that good, go and raise money. Developers, designers, testers, salespeople, they are not there to finance your costs; that is what banks, partners and VCs are for.

Also, I’m sorry to say, but your idea is very unlikely to be that good and make that much money that quickly. If you disagree, hey, I have a great idea here. If you work for free for six months, one year tops, I’m pretty sure there's a good possibility I’ll make a millionaire, what do you say?

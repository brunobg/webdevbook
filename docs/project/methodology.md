# Software development methodology

The reason you want to have a methodology for your software is to have consistency and predictability. Methodologies are there to ensure you can have a reasonable guess of how long a project will take to be developed.

## Project management: Waterfall, Agile...

For a long time waterfall was the dominant methodology for software development. It's basic idea is to have a linear approach with a well defined sequence of events:

1. specification
2. analysis
3. design
4. implementation
5. testing
6. fixes
7. deployment and maintenance

Then agile methodologies came by. The name encompasses a range of practices, such as Scrum. While waterfall assumes you can plan an entire project at the beginning, agile has the more practical view that work should be broken into smaller schedules called sprints, with a fixed duration that usually ranges from one to four weeks. Sprints have a prioritized list of deliverables planned at the beginning of each one. Eventual problems are handled as they come, and the project is reviewed and tested continuously.

As usual, both approaches have advantages and disadvantages.

Waterfall has a very clear picture of the entire application. One common problem of agile is to plan just for the next sprint, with a very short sighted view of the project as a whole; it's like instead of looking at the entire map to know where you are going you only make decisions for every street corner. You might end up at a cul-de-sac.

Agile will be a source of problems when the decision makers (stakeholders, product managers) do not understand that sprints are not complete new application redesigns and opportunities for new features. Customers tend to hate waterfall, however, because after four or six months they get the news that the application is not ready and what is ready is not at all what they wanted. They are right about it.

Mixing a bit of both worlds makes sense: have a draft specification of the application as a whole that serves as a big picture roadmap, but implement features using sprints. There's something called BRUF (Big Requirements Up Front) and BDUF (Big Design Up Front), which means writing all the big requirements at the beginning, in a kind of "short waterfall" attempt. It tends to suffer from the same problems of waterfall. It's better to understand that you cannot foresee everything, but that you also need to foresee a few things. It's a very different thing to try to write detailed technical requirements, and to write an overview of the product and a roadmap.

### Scrum

[Scrum](<https://en.wikipedia.org/wiki/Scrum_(software_development)>) is probably the most used framework in agile methodologies. It consists in following a number of key practices.

Teams are based on three kinds of players: product owner, scrum master and developers. Product owner is the connection to stakeholders or customers, who are presented with the partial results and decide next steps to achieve good business results. Ideally there is a single product owner: this is important to make sure that there is a single person who can make decisions whenever necessary and consistently. It's a common problem of projects to have "too many chiefs", and nobody calling decisions.

The scrum master is responsible to manage the team of developers and deliver goals, and to manage the scrum itself. Solving any issues that arise for the team, ensure good communication between everyone, handling the product owner and stakeholders to ensure good practices are followed and organizing the sprints are attributions of the scrum master.

The team of developers (which include not only programmers, but also designers, tester and any other personnel implementing the project) is self organizing and can interact freely between themselves. Ideally they should take part of meeting with the customer and product owner whenever information relevant to them is discussed.

## What your development routine should be like

No matter your and your company's thoughts about project methodologies, there's a basic routine for your own development process. Nobody writes perfect code right away. We all follow these basic four steps:

1. Analyse the specification/requirements. Discuss and correct any problems there before implementing. Requirements should include user stories.
2. Write code and tests following the requirements. Make sure your tests handle all relevant cases.
3. Make your code work properly. Your first version will probably be buggy. Pass all tests.
4. Once your code works, go back and clean it. You may break it while cleaning it up, but that's you'll have tests to make sure it's still working.

The first three steps are very clear. A good specification covers all the questions a developer will have during implementation. Writing code and tests is our bread and butter, and by following the user stories and code coverage your tests should be ok ([remember to test invalid cases!](../backend/testing.md)). If your tests are not passing, you fix your code. But what about the fourth step? What is clean code?

There are all many definitions of what clean code is. There are whole books about it, like Robert "Uncle Bob" C. Martin's "Clean Code". There's no perfect definition. Here's what he has to say:

:::tip
Clean code is code that has been taken care of. Someone has taken the time to keep it simple and orderly. They have paid appropriate attention to details. They have cared.

— Robert C. Martin
:::

Another proposal comes from [this cartoon ](https://www.osnews.com/story/19266/wtfsm/):

![WTFs per minute](./images/wtfm.jpg)

Since standards are so good that we should have a lot of them, let me venture my own definition of clean code

:::tip
Clean code is code other people read and understand, and have no suggestions to make it clearer.
:::

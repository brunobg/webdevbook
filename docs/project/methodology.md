# Software development methodology

The reason you want to have a methodology for your software is to have consistency and predictability. Methodologies are there to ensure you can have a reasonable guess of how long a project will take to be developed.

## Waterfall, Agile...

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

## Communication is the root of all problems

On the other hand water
